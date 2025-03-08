import { ChangeDetectionStrategy, Component, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { distinctUntilChanged, startWith } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    TranslateModule,
    IconDirective,
    MatInputModule
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @ViewChild('drawer') drawer: MatSidenav = {} as MatSidenav;
  private storage = inject(StorageService);
  private platformId = inject(PLATFORM_ID);

  public loading = signal(false);

  public navbarPages = this.storage.getNavbar();
  public navbarBackup = this.navbarPages;

  public search = new FormControl('');

  public isMobile = isPlatformBrowser(this.platformId) ? window.innerWidth < 1024 : false;
  public isMaximize = true;

  public ngOnInit(): void {
    this.search.valueChanges
      .pipe(startWith(''), distinctUntilChanged())
      .subscribe(() => {
        const resp = this.navbarBackup.filter(el => (el.label.toUpperCase()).includes(this.search?.value?.toUpperCase() || ''));
        this.navbarPages = this.orderList(resp);
      });
  }

  public orderList(list: any[]) {
    return list.sort((a, b) => a.order - b.order);
  }

  public drawerToggle() {
    this.drawer.toggle();
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        dispatchEvent(new Event('resize'));
      }, 300);
    }
  }

  public logout() {}

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = (event.target as Window).innerWidth <= 1024;
    }
  }
}
