import {Component, OnInit} from '@angular/core';
import {LoginApiService} from '../../@service/login-api.service';
import {TokenBean} from '../../@common/ServiceBean';
import {APP_TENANT_ID, APP_USER_ID, OAUTH_ACCESS_TOKEN, OAUTH_REFRSH_TOKEN} from '../../@common/Constant';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    constructor(private service: LoginApiService) {
    }

    ngOnInit() {
    }

    login(account: string, password: string) {
        const observable = this.service.loginByPassword(account, password, '11', '11');
        observable.subscribe((data: TokenBean) => {
                sessionStorage.setItem(OAUTH_ACCESS_TOKEN, data.access_token);
                sessionStorage.setItem(OAUTH_REFRSH_TOKEN, data.access_token);
                sessionStorage.setItem(APP_USER_ID, String(data.user_id));
                sessionStorage.setItem(APP_TENANT_ID, String(data.tenant_id));
                // 进行获取用户的详细信息
                const userInfo = this.service.getUserInfo();
                userInfo.subscribe((info: any) => {
                    console.log(info);
                    //    用户成功跳转到首页 ， 并将首页的地址栏进行更换
                });
            }
        );
    }
}
