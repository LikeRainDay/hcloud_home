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
        console.log(`密码为：${password}`);
        const observable = this.service.loginByPassword(account, this.encoder.encodeKey(password), '11', '11');
        observable.subscribe((data: any) =>
            console.log(data)
        );
    }
}
