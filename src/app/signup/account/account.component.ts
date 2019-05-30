import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/service/user.service';
import {RegisterUserInfo} from '../../@core/data/User.data';
import {CaptureService} from '../../@core/service/capture.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    registerUserInfo: RegisterUserInfo = <RegisterUserInfo>{
        username: '',
        password: '',
        code: ''
    };

    picCapture: string;

    constructor(private userService: UserService,
                private captureService: CaptureService) {
    }

    ngOnInit() {
        this.refreshCapture();
    }

    /**
     * @des 注册用户
     * @author houshuai
     * @date 2019/5/29
     */
    registerByPassword() {
        this.userService.registerByPassword(this.registerUserInfo).subscribe(res => {
            console.log(res);
        });
    }

    /**
     * @des 刷新图片
     * @author houshuai
     * @date 2019/5/29
     */
    refreshCapture() {
        this.captureService.getPicCapture().subscribe(res => {
            this.picCapture = res;
        });
    }
}
