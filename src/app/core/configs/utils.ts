import { NgxOptions, TOptions } from './../models/ngx-monaco-editor';
export const IGNORE =[
  'a',
  'ã',
  'á',
  'à',
  'áte',
  'o',
  'ó',
  'ò',
  'as',
  'os',
  'de',
  'dos',
  'das',
  'do',
  'da',
  'e',
  'é',
  'è',
  'ou',
  'para',
  'pra',
  'por',
  'pela',
  'no',
  'na',
  'nos',
  'nas',
  'um',
  'uma',
  'que',
]

export const CONFIG_MONACo_EDITOR: NgxOptions = {
  language: 'json',
  theme: 'vs-dark',
  automaticLayout: true,
  readOnly: false,
  fontSize: 14,
  tabSize: 4,
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  suggestOnTriggerCharacters: false, // Desativar sugestões ao digitar caracteres específicos
  cursorStyle: 'line',
  glyphMargin: false,
  quickSuggestions: false, // Desativar sugestões rápidas ao digitar
  acceptSuggestionOnEnter: 'off', // Não aceitar sugestões ao pressionar Enter
  wordBasedSuggestions: false, // Desativar sugestões baseadas em palavras
  lineNumbers: 'on' // Desativar numeração de linha
}
