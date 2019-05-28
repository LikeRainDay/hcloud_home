import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/service/user.service';
import {RegisterUserInfo} from '../../@core/data/User.data';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

    registerUserInfo: RegisterUserInfo = <RegisterUserInfo>{
        code: '',
        password: '',
        phone: ''
    };

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    registerByPhone() {
        console.log('---手机号注册--');
    }
}
