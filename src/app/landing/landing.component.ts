import {Component, OnInit} from '@angular/core';
import {UserService} from '../@core/service/user.service';
import {PlatformLocation} from '@angular/common';
import {StorageService} from '../@core/utils/storage.service';
import {AuthService} from '../@core/service/auth.service';
import {ActivatedRoute} from '@angular/router';
import {APP_SOCIAL_TYPE} from '../@core/data/common/constant.common';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;

    constructor(private service: UserService,
                private auth: AuthService,
                private location: PlatformLocation,
                private storage: StorageService,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                const code = params['code'];
                if (!code) {
                    this.service.getCurrentUser();
                } else {
                    //    第三方登录
                    // const social_qq = this.storage.getItemFromLocalStorage(APP_SOCIAL_TYPE);
                    this.auth.getTokenBySocial('QQ', code).subscribe(res => {
                        console.log(`第三方登录结果为： ${res}`);
                    });
                }
            });
    }
}
