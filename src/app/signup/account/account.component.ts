import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/service/user.service';
import {RegisterUserInfo} from '../../@core/data/User.data';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    registerUserInfo: RegisterUserInfo = <RegisterUserInfo>{
        username: '',
        password: '',
        email: ''
    };

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    registerByPassword() {
        console.log('---账号密码注册--');
        console.log(this.registerUserInfo);
        console.log(this.registerUserInfo.password);
    }
}
