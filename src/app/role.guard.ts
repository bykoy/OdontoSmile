import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  user = JSON.parse(localStorage.getItem('user'));
  roles: any = null;

  constructor(private _route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(next);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean{
    var {scopes = []} = {"scopes" : this.user.role};  

    if (route.data.role.includes(scopes)) {
      this.roles = route.data.role;
      return true;
    }else{
      window.alert("No tienes autorización");
      return false;
    }
  }
}
