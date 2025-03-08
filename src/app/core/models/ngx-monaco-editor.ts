export interface NgxOptions {
  language: TLanguage;
  theme?: TTheme;
  automaticLayout?: boolean;
  readOnly?: boolean;
  lineNumbers?: TOptions
  fontSize?: number;
  tabSize?: number;
  minimap?: Minimap;
  scrollBeyondLastLine?: boolean;
  wordWrap?: TOptions;
  suggestOnTriggerCharacters?: boolean;
  acceptSuggestionOnEnter?: TOptions;
  cursorStyle?: TCursor;
  glyphMargin?: boolean;
  quickSuggestions?: boolean;
  wordBasedSuggestions?: boolean;
}

export interface Minimap {
  enabled: boolean;
}

export type TLanguage =
  | 'abap'
  | 'apex'
  | 'azcli'
  | 'bat'
  | 'bicep'
  | 'cameligo'
  | 'clojure'
  | 'coffeescript'
  | 'cpp'
  | 'csharp'
  | 'csp'
  | 'css'
  | 'dart'
  | 'dockerfile'
  | 'ecl'
  | 'elixir'
  | 'flow9'
  | 'fsharp'
  | 'go'
  | 'graphql'
  | 'handlebars'
  | 'hcl'
  | 'html'
  | 'ini'
  | 'java'
  | 'javascript'
  | 'julia'
  | 'json'
  | 'kotlin'
  | 'less'
  | 'lexon'
  | 'lua'
  | 'm3'
  | 'markdown'
  | 'mips'
  | 'msdax'
  | 'mysql'
  | 'objective-c'
  | 'pascal'
  | 'perl'
  | 'pgsql'
  | 'php'
  | 'pla'
  | 'plaintext'
  | 'postiats'
  | 'powerquery'
  | 'powershell'
  | 'pug'
  | 'python'
  | 'r'
  | 'razor'
  | 'redis'
  | 'redshift'
  | 'restructuredtext'
  | 'ruby'
  | 'rust'
  | 'sb'
  | 'scala'
  | 'scheme'
  | 'scss'
  | 'shell'
  | 'solidity'
  | 'sophia'
  | 'sparql'
  | 'sql'
  | 'st'
  | 'swift'
  | 'systemverilog'
  | 'tcl'
  | 'text'
  | 'toml'
  | 'tsx'
  | 'twig'
  | 'typescript'
  | 'vb'
  | 'xml'
  | 'yaml';

export type TTheme = 'vs' | 'vs-dark' | 'vs-light'

export type TOptions = 'on' | 'off' |  'relative'

export type TCursor = 'block' | 'line' |  'underline'
