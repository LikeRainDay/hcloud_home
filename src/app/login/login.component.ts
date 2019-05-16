import {Component, OnInit} from '@angular/core';
import {LoginApiService} from '../@service/login-api.service';
import {TokenBean} from '../@common/ServiceBean';

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
                const dd = data.access_token;
                console.log(dd);
                console.log(data);
            }
        );
    }
}
