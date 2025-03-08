import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/services/theme.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private translate = inject(TranslateService);

  title = 'toolscenter-web';

  public ngOnInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Inicializa AOS apenas no lado do cliente
      AOS.init();
    }

    this.theme.loadCurrentTheme();

    this.translate.setDefaultLang("pt-br");

    // Verificar se estamos no lado do cliente antes de acessar localStorage
    let language: string | null = null;
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      language = localStorage.getItem("language");
    }

    let browserLang = this.translate.getBrowserLang();
    browserLang = browserLang === "pt" ? "pt-br" : browserLang;
    browserLang = browserLang?.match(/pt-br|en/) ? browserLang : "pt-br";

    // Usa o idioma da localStorage se disponível, senão, usa o idioma do navegador ou o padrão
    this.translate.use(language || (browserLang === 'pt-br' ? 'pt-br' : 'en'));
  }
}
