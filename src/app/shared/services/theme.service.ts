import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  ThemeSubject = new Subject<void>();

  private userTheme: 'light' | 'dark' = 'dark';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get theme() {
    return this.userTheme;
  }

  watchTheme() {
    return this.ThemeSubject.asObservable();
  }

  toggleUserTheme() {
    if (this.userTheme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  loadCurrentTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const inLocal = localStorage.getItem('theme') as 'light' | 'dark';
      if (inLocal) {
        this.userTheme = inLocal;
        this.setTheme(inLocal);
        return inLocal;
      }

      const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
      if (deviceMode.matches) {
        this.userTheme = 'dark';
        this.setTheme('dark');
        return 'dark';
      }
      this.setTheme('light');
      return 'light';
    }

    // Caso esteja no servidor, retorna 'dark' ou 'light' como padrão.
    return 'dark'; // ou 'light', dependendo de sua preferência.
  }

  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      this.userTheme = theme;
      localStorage.setItem('theme', theme);
      const html = document.querySelector('html');

      if (theme === 'light') {
        html?.classList.remove('dark');
      } else {
        html?.classList.toggle('dark');
      }
    }
  }
}
