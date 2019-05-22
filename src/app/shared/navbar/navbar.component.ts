import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, NavigationStart, ActivatedRoute} from '@angular/router';
import {Location, PopStateEvent} from '@angular/common';
import {User, UserData} from '../../@core/data/User.data';
import {BaseRequestResult} from '../../@core/data/common/BaseRequestResult';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    public userInfo: User = null;

    constructor(public location: Location,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private service: UserData) {
    }

    ngOnInit() {
        const userInfo = this.service.getCurrentUser();
        userInfo.subscribe((info: BaseRequestResult<User>) => {
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
