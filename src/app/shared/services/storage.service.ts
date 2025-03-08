import { Injectable } from '@angular/core';
import { TRoles } from '../../core/models/utils';
import { NAVBAR_PAGES } from '../../core/configs/navbar';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public profile: TRoles = 'trainee';

  public getNavbar(){
    const navbar = NAVBAR_PAGES.filter((page) =>
      page.roles.some((role) => this.profile.includes(role))
    );

    return this.orderList(navbar)
  }

  public orderList(list: any[]) {
    return list.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }
}
