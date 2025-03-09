import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/services/theme.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private translate = inject(TranslateService);

  title = 'toolscenter-web';

  public ngOnInit() {
    if (typeof window !== 'undefined') {
      // Inicializa AOS apenas no lado do cliente
      AOS.init();
    }

    this.theme.loadCurrentTheme();
    this.translate.setDefaultLang('pt-br');

    // Verifica se localStorage está disponível antes de acessá-lo
    const language = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

    // Garante que browserLang seja sempre uma string
    const browserLang = this.translate.getBrowserLang() || 'pt-br';
    const defaultLang = browserLang === 'pt' ? 'pt-br' : browserLang;
    const validLang = ['pt-br', 'en'].includes(defaultLang) ? defaultLang : 'pt-br';

    this.translate.use(language ?? validLang);
  }
}
