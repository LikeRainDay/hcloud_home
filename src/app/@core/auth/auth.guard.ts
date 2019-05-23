import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../service/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {
    }

    // 路由守卫
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        const isLogin = this.userService.isLogin();
        if (isLogin) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
