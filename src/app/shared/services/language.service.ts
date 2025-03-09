import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private translate = inject(TranslateService);

  get current() {
    if (typeof window === "undefined") {
      return "pt-br"; // Valor padrão caso esteja rodando no servidor
    }

    const allLangs = this.translate.getLangs();
    const browserLang = allLangs.includes(this.translate.getBrowserLang() || "")
      ? this.translate.getBrowserLang()
      : "";

    return (
      this.translate.currentLang ||
      localStorage.getItem("language") ||
      browserLang ||
      "pt-br"
    );
  }

  set current(value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", value);
    }
    this.translate.use(value);
  }
}
