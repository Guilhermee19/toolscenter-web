import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  async copyText(text: string) {
    // Verifica se a API da área de transferência está disponível
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado para a área de transferência');
      }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
    } else {
      // Fallback para navegadores que não suportam a API da área de transferência
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999); // Para dispositivos móveis

      try {
        document.execCommand('copy');
        console.log('Texto copiado para a área de transferência');
      } catch (err) {
        console.error('Erro ao copiar texto: ', err);
      }

      document.body.removeChild(textArea);
    }
  }

  async pasteTextFromClipboard(): Promise<string | null> {
    let text = null;

    // Verifica se a API da área de transferência está disponível
    if (navigator.clipboard) {
      try {
        const clipboardText = await navigator.clipboard.readText();
        text = clipboardText;
        console.log('Texto colado da área de transferência:', text);
      } catch (err) {
        console.error('Erro ao colar texto da área de transferência:', err);
      }
    } else {
      // Fallback para navegadores que não suportam a API da área de transferência
      const textArea = document.createElement('textarea');
      document.body.appendChild(textArea);

      textArea.focus();
      try {
        document.execCommand('paste');
        text = textArea.value;
        console.log('Texto colado da área de transferência:', text);
      } catch (err) {
        console.error('Erro ao colar texto da área de transferência:', err);
      }

      document.body.removeChild(textArea);
    }

    return text;
  }
}
