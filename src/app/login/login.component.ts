import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthData, Token} from '../@core/data/Auth.data';
import {APP_TENANT_ID, APP_USER_ID, OAUTH_ACCESS_TOKEN, OAUTH_REFRSH_TOKEN} from '../@core/data/common/Constant';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    inputIsError = false;

    constructor(private service: AuthData, private router: Router) {
    }

    ngOnInit() {
    }

    login(account: string, password: string) {
        const observable = this.service.getTokenByPassword(account, password, '');
        observable.subscribe((data: Token) => {
                console.log(data);
                sessionStorage.setItem(OAUTH_ACCESS_TOKEN, data.access_token);
                sessionStorage.setItem(OAUTH_REFRSH_TOKEN, data.access_token);
                sessionStorage.setItem(APP_USER_ID, String(data.user_id));
                sessionStorage.setItem(APP_TENANT_ID, String(data.tenant_id));
                if (data.access_token != null) {
                    this.router.navigate(['/home']);
                    this.inputIsError = false;
                } else {
                    this.inputIsError = true;
                }
            }
        );
    }
}
