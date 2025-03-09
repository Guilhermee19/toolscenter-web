import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ConvertTextService } from '../../../shared/services/convert-text.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { SaveConfigService } from '../../../shared/services/save-config.service';
import { ITextConvert } from '../../../core/models/config';
import { CodeMirrorOptions } from '../../../core/models/codemirror';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import "codemirror/mode/javascript/javascript";
import 'codemirror/theme/darcula.css';

@Component({
  selector: 'app-text-convert',
  standalone: true,
  imports: [
    CommonModule,
    IconDirective,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    CodemirrorModule,
  ],
  templateUrl: './text-convert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextConvertComponent implements OnInit {
  private utils = inject(UtilsService)
  private convertService = inject(ConvertTextService)
  private fb = inject(FormBuilder);
  private saveConfig = inject(SaveConfigService);

  public isBrowser = typeof window !== 'undefined';

  public convertOptions = [
    { label: 'text_convert.camel_case', action: 'camel_case' },
    { label: 'text_convert.lower_case', action: 'lower_case' },
    { label: 'text_convert.upper_case', action: 'upper_case' },
    { label: 'text_convert.pascal_case', action: 'pascal_case' },
    { label: 'text_convert.kebab_case', action: 'kebab_case' },
    { label: 'text_convert.reverse', action: 'reverse' },
  ]

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

  public text_form = this.fb.group({
    encode: [''],
    decode: [''],
    action: ['lower_case'],
  });

  public ngOnInit(){
    const TEXT_CONVERT: ITextConvert | undefined | null = this.saveConfig.textConvert;
    if(!TEXT_CONVERT) return;

    this.text_form.patchValue({
      action: TEXT_CONVERT.action,
      encode: TEXT_CONVERT.encode,
      decode: TEXT_CONVERT.decode,
    })

    if (this.isBrowser) {
      this.text_form.get('encode')?.valueChanges.subscribe(() => {
        this.valueChanges();
      });
    }

    this.valueChanges();
  }

  valueChanges(){
    if(!this.text_form.value?.encode) return;
    this.convertText(this.text_form.value.encode)
  }

  setClass(type: string){
    const action = this.text_form.get('action')?.value || '';
    return action === type ? 'accent' : 'primary'
  }

  setAction(action: string){
    this.text_form.get('action')?.patchValue(action)
    const encode = this.text_form.get('encode')?.value || '';
    const decode = this.text_form.get('decode')?.value || '';

    this.saveConfig.textConvert = { action, encode, decode };
    this.valueChanges()
  }

  convertText(encode: string){
    const action = this.text_form.get('action')?.value || '';

    this.text_form.get('decode')?.patchValue(
      this.convertService.convertText(encode, action)
    )
  }

  copyText(text: string | null | undefined) {
    if(!text) return;
    this.utils.copyText(text)
  }

  pasteText() {
    this.utils.pasteTextFromClipboard()
  }

  clearInput(){
    this.text_form.patchValue({
      encode: '',
      decode: ''
    })

    const action = this.text_form.get('action')?.value || '';
    this.saveConfig.textConvert = { action, encode:'', decode:'' };
  }
}
