export type CodeMirrorTheme =
  | '3024-day' | '3024-night' | 'abcdef' | 'ambiance' | 'ayu-dark'
  | 'ayu-mirage' | 'base16-dark' | 'base16-light' | 'bespin' | 'blackboard'
  | 'cobalt' | 'colorforth' | 'darcula' | 'dracula' | 'duotone-dark'
  | 'duotone-light' | 'eclipse' | 'elegant' | 'erlang-dark' | 'gruvbox-dark'
  | 'hopscotch' | 'icecoder' | 'idea' | 'isotope' | 'lesser-dark'
  | 'liquibyte' | 'lucario' | 'material' | 'material-darker'
  | 'material-ocean' | 'material-palenight' | 'mbo' | 'mdn-like' | 'midnight'
  | 'monokai' | 'moxer' | 'neat' | 'neo' | 'night' | 'nord' | 'oceanic-next'
  | 'panda-syntax' | 'paraiso-dark' | 'paraiso-light' | 'pastel-on-dark'
  | 'railscasts' | 'rubyblue' | 'seti' | 'shadowfox' | 'solarized' | 'ssms'
  | 'the-matrix' | 'tomorrow-night-bright' | 'tomorrow-night-eighties'
  | 'ttcn' | 'twilight' | 'vibrant-ink' | 'xq-dark' | 'xq-light'
  | 'yeti' | 'yonce' | 'zenburn';

export type CodeMirrorMode =
  | 'javascript' | 'text/typescript' | 'htmlmixed' | 'xml' | 'css' | 'scss' | 'less'
  | 'python' | 'java' | 'cpp' | 'c' | 'csharp' | 'php' | 'swift' | 'ruby'
  | 'go' | 'r' | 'kotlin' | 'objective-c' | 'sql' | 'application/json' | 'yaml'
  | 'markdown' | 'plaintext' | 'shell' | 'rust' | 'dart' | 'lua' | 'vb'
  | 'powershell' | 'perl' | 'coffeescript' | 'graphql' | 'dockerfile'
  | 'tcl' | 'groovy' | 'handlebars' | 'protobuf' | 'sas' | 'stata'
  | 'pascal' | 'fsharp' | 'haskell' | 'ocaml' | 'matlab' | 'verilog'
  | 'racket' | 'nim' | 'elixir' | 'scheme' | 'julia' | 'fortran' | 'clojure';

export interface CodeMirrorOptions {
    mode?: CodeMirrorMode; // Define a linguagem para syntax highlighting
    theme?: CodeMirrorTheme; // Define o tema visual
    lineNumbers?: boolean; // Exibir números de linha
    readOnly?: boolean | 'nocursor'; // Somente leitura
    tabSize?: number; // Tamanho do tab
    indentUnit?: number; // Número de espaços para identação
    smartIndent?: boolean; // Indentação automática
    lineWrapping?: boolean; // Quebra automática de linha
    showCursorWhenSelecting?: boolean; // Mostrar cursor ao selecionar texto
    autofocus?: boolean; // Focar automaticamente ao carregar
    matchBrackets?: boolean; // Destacar colchetes correspondentes
    autoCloseBrackets?: boolean; // Fechar automaticamente colchetes
    lint?: boolean; // Verificação de erros (Precisa de addons)
    extraKeys?: Record<string, string>; // Mapeamento de atalhos personalizados
    viewportMargin?: number; // Define a margem de renderização para melhor performance
    foldGutter?: boolean; // Permitir dobrar trechos de código
    gutters?: string[]; // Elementos laterais (ex: 'CodeMirror-linenumbers')
    highlightSelectionMatches?: boolean | { showToken?: boolean; annotateScrollbar?: boolean }; // Destacar trechos iguais ao selecionado
    matchTags?: boolean | { bothTags?: boolean }; // Destacar tags correspondentes no HTML/XML
    continueComments?: boolean; // Continua comentários automaticamente ao pressionar "Enter"
    enableCodeFolding?: boolean; // Ativa ou desativa code folding (requere foldGutter)
    indentWithTabs?: boolean
  }
