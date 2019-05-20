import {Component, OnInit} from '@angular/core';
import {LoginApiService} from '../@service/login-api.service';
import {TokenBean} from '../@common/ServiceBean';
import {APP_TENANT_ID, APP_USER_ID, OAUTH_ACCESS_TOKEN, OAUTH_REFRSH_TOKEN} from '../@common/Constant';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {BaseRequestResult} from '../@service/@bean/BaseRequestResult';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    inputIsError = false;

    constructor(private service: LoginApiService, private router: Router) {
    }

    ngOnInit() {
    }

    login(account: string, password: string) {
        const observable = this.service.loginByPassword(account, password, '11', '11');
        observable.subscribe((data: TokenBean) => {
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
