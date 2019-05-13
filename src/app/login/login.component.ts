import {Component, OnInit} from '@angular/core';
import {LoginApiService} from '../@service/login-api.service';

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
        observable.subscribe((data: any) =>
            console.log(data)
        );
    }
}
