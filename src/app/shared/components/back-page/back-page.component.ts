import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-back-page',
  standalone: true,
  imports: [],
  templateUrl: './back-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackPageComponent {

}
