import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthData, Token} from '../@core/data/Auth.data';
import {WindowService} from '../@core/utils/window.service';
import {APP_SOCIAL_TYPE, SocialType} from '../@core/data/common/constant.common';
import {StorageService} from '../@core/utils/storage.service';

interface Social {
    type: SocialType;
    url: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    inputIsError = false;

    qqSocial: Social = {
        url: 'https://graph.qq.com/oauth2.0/authorize?' +
            'client_id=101567767&response_type=code&redirect_uri=http://hcloud.com:4200/social',
        type: SocialType.QQ
    };

    wzSocial: Social = {
        url: 'https://graph.qq.com/oauth2.0/authorize?' +
            'client_id=101567767&response_type=token&redirect_uri=http://hcloud.com:4200/social',
        type: SocialType.WX
    };

    constructor(private service: AuthData,
                private router: Router,
                private storage: StorageService,
                private window: WindowService) {
    }

    ngOnInit() {
    }

    login(account: string, password: string) {
        const observable = this.service.getTokenByPassword(account, password, '');
        observable.subscribe((data: Token) => {
                console.log(data);
                if (data.access_token != null) {
                    this.router.navigate(['/home']);
                    this.inputIsError = false;
                } else {
                    this.inputIsError = true;
                }
            }
        );
    }

    openWindow(social: Social) {
        this.window.openWindowNoSize(social.url);
        this.storage.setItemToLocalStorage(APP_SOCIAL_TYPE, social.type);
    }
}
