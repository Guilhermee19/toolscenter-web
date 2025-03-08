import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

}
