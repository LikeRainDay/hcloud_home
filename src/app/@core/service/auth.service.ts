import {Injectable} from '@angular/core';
import {AuthData, Token} from '../data/Auth.data';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from '../utils/storage.service';
import {OAUTH_ACCESS_TOKEN} from '../data/common/constant.common';
import {catchError} from 'rxjs/operators';
import {EncrtyService} from '../utils/encrty.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends AuthData {

    scope = 'server';

    AUTHORIZATION = 'Basic aGNsb3VkOmhjbG91ZF9zZWN1cml0eQ==';

    constructor(private  http: HttpClient,
                private stroage: StorageService,
                private  encrty: EncrtyService) {
        super();
    }

    getTokenByMobile(mobile: string, code: string): Observable<Token> {
        const url = '/auth/mobile/token/sms';
        const grant_type = 'mobile';
        const header = new HttpHeaders();
        header.set('isToken', 'false');
        header.set('TENANT_ID', '1');
        header.set('Authorization', this.AUTHORIZATION);
        return this.http.post<any>(url, {
            mobile: 'SMS@' + mobile,
            code: code,
            grant_type: grant_type,
            scope: this.scope
        }, {
            headers: header
        }).debounceTime(2000).pipe(
            catchError(this.handleError('loginByMobile', []))
        );
    }

    getTokenBySocial(state: string, code: string): Observable<Token> {
        const url = '/auth/mobile/token/social';
        const grant_type = 'mobile';
        const header = new HttpHeaders();
        header.set('isToken', 'false');
        header.set('TENANT_ID', '1');
        header.set('Authorization', this.AUTHORIZATION);
        return this.http.post<any>(url, {
            mobile: state + '@' + code,
            scope: this.scope,
            grant_type: grant_type
        }, {
            headers: header
        }).debounceTime(2000).pipe(
            catchError(this.handleError('loginBySocial', []))
        );
    }

    getRefreshToken(refresh_token: string): Observable<Token> {
        return undefined;
    }

    getTokenByPassword(username: string, password: string, code: string): Observable<Token> {
        this.stroage.removeItemFromSessionStorage(OAUTH_ACCESS_TOKEN);
        const url = '/auth/oauth/token';
        const grant_type = 'password';
        const urlEncode = encodeURIComponent(this.encrty.encryptClick(password));
        const header = new HttpHeaders()
            .set('isToken', 'false')
            .set('Authorization', this.AUTHORIZATION)
            .set('TENANT_ID', '1');
        return this.http.get<any>(
            `${url}?username=${username}&password=${urlEncode}&code=${code}&grant_type=${grant_type}&scope=${this.scope}`, {
                headers: header
            }).debounceTime(2000).pipe(
            catchError(this.handleError('loginByPassword', []))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // log to console instead
            console.error(error);
            // console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
