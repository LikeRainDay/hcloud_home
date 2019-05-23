import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthData, Token} from '../@core/data/Auth.data';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    inputIsError = false;

    constructor(private service: AuthData, private router: Router) {
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
}
