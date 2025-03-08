import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent {

}
