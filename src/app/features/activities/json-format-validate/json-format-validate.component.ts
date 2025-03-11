import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConvertInterfaceService } from '../../../shared/services/convert-interface.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CodeMirrorOptions } from '../../../core/models/codemirror';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-json-format-validate',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CodemirrorModule
  ],
  templateUrl: './json-format-validate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonFormatValidateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private convert = inject(ConvertInterfaceService);
  private platformId = inject(PLATFORM_ID);

  public isBrowser = isPlatformBrowser(this.platformId);

  public configCodemirror: CodeMirrorOptions = {
    lineNumbers: true,
    theme: 'darcula',
    mode: 'text/typescript',
    readOnly: false,
    lineWrapping: true,
    tabSize: 2,
    indentWithTabs: false,
    indentUnit: 2,
    autoCloseBrackets: true,
  }

  public image_form = this.fb.group({
    json: [''],
    decode: [''],
    order: [false],
    invert: [false],
    mono_type: [false],
  });

  public async ngOnInit() {
    if (this.isBrowser) {
      await this.loadCodeMirror();
      this.image_form.get('json')?.valueChanges.subscribe(() => {
        this.onEditorInit();
      });
    }
  }

  private async loadCodeMirror() {
    if (this.isBrowser) {
      await import('codemirror/mode/javascript/javascript').catch(() => {});
      await import('codemirror/theme/darcula.css').catch(() => {});
    }
  }

  public onEditorInit() {
    if (!this.isBrowser) return;

    const string_json = this.image_form.get('json')?.value || '';

    if (string_json) {
      try {
        const order = this.image_form.get('order')?.value || false;
        const mono_type = this.image_form.get('mono_type')?.value || false;
        const invert = this.image_form.get('invert')?.value || false;
        const json = JSON.parse(string_json);

        this.image_form.get('decode')?.patchValue(
          this.convert.jsonToTypeScriptInterface(json, mono_type, 'Root', order, invert)
        );
      } catch (error) {
        console.error('Erro ao processar JSON:', error);
      }
    }
  }

  public copyText() {
    if (!this.isBrowser) return;

    const textArea = document.createElement('textarea');
    textArea.value = this.image_form.value?.decode || '';
    document.body.appendChild(textArea);

    textArea.select();
    textArea.setSelectionRange(0, 99999);

    try {
      document.execCommand('copy');
      console.log('Texto copiado com sucesso!');
    } catch (err) {
      console.error('Erro ao copiar texto: ', err);
    }

    document.body.removeChild(textArea);
  }

  public clearInput() {
    this.image_form.patchValue({
      json: "",
      decode: "",
    });
  }
}
