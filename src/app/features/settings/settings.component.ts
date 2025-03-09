import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconDirective } from '../../shared/directives/icon.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService } from '../../shared/services/theme.service';
import { LanguageService } from '../../shared/services/language.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    IconDirective,
    TranslateModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  private translate = inject(TranslateService);
  private languageService = inject(LanguageService);

  theme = '';
  light: boolean = false;
  language: "en" | "pt-br" = 'en';

  version = environment.version;

  order = 'default';
  orders = [
    { label: 'Ordem Padrão', order: 'default'},
    { label: 'Ordem Inteligente', order: 'intelligent'},
    { label: 'Ordem Alfabética', order: 'alphabetical'},
  ];

  ngOnInit(): void {
    this.translate.setDefaultLang("pt-br");

    const language = localStorage.getItem("language") as "en" | "pt-br" | null;

    let browserLang = this.translate.getBrowserLang() || 'pt-br';
    browserLang = browserLang === "pt" ? "pt-br" : browserLang;

    // Garantindo que o browserLang seja um dos valores aceitos
    const validLang = (['pt-br', 'en'].includes(browserLang) ? browserLang : 'pt-br') as "en" | "pt-br";

    // Definir a linguagem preferida com tipo correto
    this.language = language ?? validLang;
    this.translate.use(this.language);

    this.light = this.themeService.theme === 'light';
    this.theme = this.light ? 'light' : 'dark';
  }

  toggleTheme() {
    this.themeService.toggleUserTheme();
    this.light = !this.light;
  }

  eventSelect() {
    this.selectLang(this.language);
  }

  selectLang(language: "en" | "pt-br") {
    this.translate.use(language);
    this.languageService.current = language;
  }
}
