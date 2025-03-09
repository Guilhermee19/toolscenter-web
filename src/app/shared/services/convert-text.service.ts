import { Injectable } from '@angular/core';
import chroma from 'chroma-js'; // Use a importação default
import { IGNORE } from '../../core/configs/utils';

@Injectable({
  providedIn: 'root'
})
export class ConvertTextService {

  convertText(encode: string, action: string) {
    if (!encode) return "";

    const input = encode.toLowerCase();
    const words = input.split(' ');
    const lines = encode.split(/\r?\n/); // Separa o texto em linhas

    switch(action) {
      case "lower_case":
        return input;

      case "upper_case":
        return encode.toUpperCase();

      case "sentence_case":
        const transformedSentence = lines.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          // Aplica sentence_case em cada linha
          return line.charAt(0).toUpperCase() + line.slice(1).toLowerCase();
        });

        return transformedSentence.join('\n'); // Junta as linhas de volta com quebra de linha

      case "title_case":
        const transformedTitle = lines.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          const words = line.toLowerCase().split(' ');
          const capitalizedWords = words.map(word => {
            if (IGNORE.includes(word)) {
              return word;
            } else {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }
          });

          return capitalizedWords.join(' ');
        });

        return transformedTitle.join('\n'); // Junta as linhas de volta com quebra de linha

      case "camel_case":
        const transformedCamel = lines.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          const words = line.trim().toLowerCase().split(/\s+/); // Divide a linha em palavras

          // Transforma a primeira palavra em minúscula
          let camelCaseString = words[0];

          // Para as palavras restantes, transforma a primeira letra em maiúscula
          for (let i = 1; i < words.length; i++) {
            camelCaseString += words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }

          return camelCaseString;
        });

        return transformedCamel.join('\n'); // Junta as linhas de volta com quebra de linha


      case "pascal_case":
        const transformedPascal = lines.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          const words = line.trim().toLowerCase().split(' '); // Divide a linha em palavras

          const pascalWords = words.map(word => {
            if (IGNORE.includes(word)) {
              return word;
            } else {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }
          });

          return pascalWords.join('');
        });

        return transformedPascal.join('\n'); // Junta as linhas de volta com quebra de linha


      case "snake_case":
        return words.join('_');

      case "constant_case":
        return words.join('_').toUpperCase();

      case "kebab_case":
        const linesKebab = encode.split(/\r?\n/); // Separa o texto em linhas

        const transformedKebab = linesKebab.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          return line.trim().toLowerCase().replace(/\s+/g, '-');
        });

        return transformedKebab.join('\n'); // Junta as linhas de volta com quebra de linha

      case "cobol_case":
        const linesCobol = encode.split(/\r?\n/); // Separa o texto em linhas

        const transformedCobol = linesCobol.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          return line.trim().toLowerCase().replace(/\s+/g, '-').toUpperCase();
        });

        return transformedCobol.join('\n'); // Junta as linhas de volta com quebra de linha

      case "train_case":
        const transformedTrain = lines.map(line => {
          if (line.trim() === "") return ""; // Ignora linhas em branco

          const words = line.trim().toLowerCase().split(/\s+/); // Divide a linha em palavras

          const transformedLine = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }).join('-');

          return transformedLine;
        });

        return transformedTrain.join('\n'); // Junta as linhas de volta com quebra de linha


      case "reverse":
        return encode.split('').reverse().join('');

      default:
        return "";
    }
  }
}
