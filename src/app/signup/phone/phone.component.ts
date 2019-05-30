import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/service/user.service';
import {RegisterUserInfo} from '../../@core/data/User.data';
import {CaptureService} from '../../@core/service/capture.service';

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

    constructor(private userService: UserService,
                private captureService: CaptureService) {
    }

    ngOnInit() {
    }

    registerByPhone() {
        this.userService.registerByPhone(this.registerUserInfo).subscribe(res => {
            console.log(res);
        });
    }

    sendSmsCapture() {
        this.captureService.sendSmsCapture(this.registerUserInfo.phone).subscribe(res => {
            if (res.code === 0) {
                // 发送成功
            } else {
                // 发送失败
            }
        });
    }
}
