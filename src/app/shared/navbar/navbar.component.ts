import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, NavigationStart, ActivatedRoute} from '@angular/router';
import {Location, PopStateEvent} from '@angular/common';
import {ApiService} from '../../@core/service/api.service';
import {UserInfoBean} from '../../@core/data/UserInfoBean';
import {BaseRequestResult} from '../../@core/data/BaseRequestResult';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    public userInfo: UserInfoBean = null;

    constructor(public location: Location,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private service: ApiService) {
    }

    ngOnInit() {
        const userInfo = this.service.getUserInfo();
        userInfo.subscribe((info: BaseRequestResult<UserInfoBean>) => {
            console.log(info);
            if (info.code === 0) {
                this.userInfo = info.data;
            } else {
                console.log('失败');
            }
        });

        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url !== this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url === this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
    }
}
