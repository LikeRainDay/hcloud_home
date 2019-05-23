import {Component, OnInit} from '@angular/core';
import {UserService} from '../@core/service/user.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;

    constructor(private service: UserService) {
    }

    ngOnInit() {
        this.service.getCurrentUser();
        this.service.currentUser.subscribe(res => {
            console.log(res);
        });
    }

}
