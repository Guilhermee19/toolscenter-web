import { Injectable } from '@angular/core';
import chroma from 'chroma-js'; // Use a importação default

@Injectable({
  providedIn: 'root'
})
export class ConvertColorService {
  convertColor(hex: string) {
    const rgb = chroma(hex).rgb();
    const hsl = chroma(hex).hsl();
    const lab = chroma(hex).lab();
    const lch = chroma(hex).lch();  // Luv in chroma.js is LCH (LCHuv)

    // Função personalizada para CMYK
    function rgbToCmyk(r: number, g: number, b: number) {
      const rPercent = r / 255;
      const gPercent = g / 255;
      const bPercent = b / 255;

      const k = 1 - Math.max(rPercent, gPercent, bPercent);
      const c = (1 - rPercent - k) / (1 - k) || 0;
      const m = (1 - gPercent - k) / (1 - k) || 0;
      const y = (1 - bPercent - k) / (1 - k) || 0;

      return [c * 100, m * 100, y * 100, k * 100]; // Valores de 0 a 100 para CMYK
    }

    const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);

    return {
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      hex: hex.toUpperCase(),
      cmyk: `cmyk(${cmyk[0].toFixed(2)}%, ${cmyk[1].toFixed(2)}%, ${cmyk[2].toFixed(2)}%, ${cmyk[3].toFixed(2)}%)`,
      lab: `lab(${lab[0].toFixed(2)}, ${lab[1].toFixed(2)}, ${lab[2].toFixed(2)})`,
      hsl: `hsl(${hsl[0].toFixed(2)}, ${(hsl[1] * 100).toFixed(2)}%, ${(hsl[2] * 100).toFixed(2)}%)`,
      luv: `luv(${lch[0].toFixed(2)}, ${lch[1].toFixed(2)}, ${lch[2].toFixed(2)})`, // LCHuv as Luv
    };
  }

  // Função para gerar tonalidades (shades) da cor selecionada até preto
  generateShades(hex: string): string[] {
    const shades = [];
    for (let i = 0; i <= 9; i++) {
      // Interpolar entre a cor e preto em 10% incrementos
      const shade = chroma.mix(hex, 'black', i / 10).hex();
      shades.push(shade);
    }
    return shades;
  }

  // Função para gerar matizes (tints) da cor selecionada até branco
  generateTints(hex: string): string[] {
    const tints = [];
    for (let i = 0; i <= 9; i++) {
      // Interpolar entre a cor e branco em 10% incrementos
      const tint = chroma.mix(hex, 'white', i / 10).hex();
      tints.push(tint);
    }
    return tints.reverse();
  }
}
