import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconDirective } from '../../shared/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IconDirective,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private storage = inject(StorageService)

  navbarPages = this.storage.getNavbar();
}
