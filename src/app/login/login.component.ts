import {Component, OnInit} from '@angular/core';
import {LoginApiService} from '../@service/login-api.service';
import {HttpUrlEncodingCodec} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    constructor(private service: LoginApiService, private encoder: HttpUrlEncodingCodec
    ) {
    }

    ngOnInit() {
    }

    login(account: string, password: string) {
        console.log(`账号为：${account}`);
        console.log(`密码为1：${password}`);
        console.log(`密码为2：${encodeURIComponent(password)}`);
        console.log(`密码为2：${encodeURIComponent(password.trim())}`);
        const observable = this.service.loginByPassword(account, password, '11', '11');
        observable.subscribe((data: any) =>
            console.log(data)
        );
    }
}
