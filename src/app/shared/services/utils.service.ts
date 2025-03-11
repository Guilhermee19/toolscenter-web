import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  async copyText(text: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Texto copiado para a área de transferência');
        } catch (err) {
          console.error('Erro ao copiar texto: ', err);
        }
      } else {
        this.copyTextFallback(text);
      }
    } else {
      console.warn('Tentativa de copiar texto no servidor (SSR), ação ignorada.');
    }
  }

  private copyTextFallback(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Para dispositivos móveis

    try {
      document.execCommand('copy');
      console.log('Texto copiado para a área de transferência (fallback)');
    } catch (err) {
      console.error('Erro ao copiar texto: ', err);
    }

    document.body.removeChild(textArea);
  }

  async pasteTextFromClipboard(): Promise<string | null> {
    let text = null;

    if (isPlatformBrowser(this.platformId)) {
      if (navigator.clipboard) {
        try {
          text = await navigator.clipboard.readText();
          console.log('Texto colado da área de transferência:', text);
        } catch (err) {
          console.error('Erro ao colar texto da área de transferência:', err);
        }
      } else {
        text = this.pasteTextFallback();
      }
    } else {
      console.warn('Tentativa de colar texto no servidor (SSR), ação ignorada.');
    }

    return text;
  }

  private pasteTextFallback(): string | null {
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.focus();

    let text = null;
    try {
      document.execCommand('paste');
      text = textArea.value;
      console.log('Texto colado da área de transferência (fallback):', text);
    } catch (err) {
      console.error('Erro ao colar texto da área de transferência:', err);
    }

    document.body.removeChild(textArea);
    return text;
  }
}
