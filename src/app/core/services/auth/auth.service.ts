import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!sessionStorage.getItem('LoginData')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
