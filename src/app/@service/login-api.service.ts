import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

const scope = 'server';
const AUTHORIZATION = 'Basic aGNsb3VkOmhjbG91ZF9zZWN1cml0eQ==';

@Injectable({
    providedIn: 'root'
})
export class LoginApiService {

    constructor(private  http: HttpClient) {
    }

    /*
    * desc: 通过用户密码登录
    * */
    public loginByPassword(username: string, password: string, code: string, randomStr: string): Observable<any> {
        const url =  '/auth/oauth/token';
        const grant_type = 'password';
        const header = new HttpHeaders()
            .set('isToken', 'false')
            .set('Authorization', AUTHORIZATION)
            .set('Access-Control-Request-Headers', '*')
            .set('TENANT_ID', '1');
        return this.http.get<any>(url, {
            headers: header,
            params: {
                username: username,
                password: password,
                randomStr: randomStr,
                code: code,
                grant_type: grant_type,
                scope: scope
            }
        }).pipe(
            catchError(this.handleError('loginByPassword', []))
        );
    }

    /*
    * 刷新token
    * */
    public refreshToken(refresh_token: string): Observable<any> {
        const url = '/auth/oauth/token';
        const grant_type = 'refresh_token';
        const header = new HttpHeaders();
        header.set('isToken', 'false');
        header.set('TENANT_ID', '1');
        header.set('Authorization', AUTHORIZATION);
        return this.http.post<any>(url, {
            grant_type: grant_type,
            refresh_token: refresh_token,
            scope: scope
        }, {
            headers: header
        }).pipe(
            catchError(this.handleError('refreshToken', []))
        );
    }

    /*
    * 通过手机登录
    * */
    public loginByMobile(mobile: string, code: string): Observable<any> {
        const url = '/auth/mobile/token/sms';
        const grant_type = 'mobile';
        const header = new HttpHeaders();
        header.set('isToken', 'false');
        header.set('TENANT_ID', '1');
        header.set('Authorization', AUTHORIZATION);
        return this.http.post<any>(url, {
            mobile: 'SMS@' + mobile,
            code: code,
            scope: scope
        }, {
            headers: header
        }).pipe(
            catchError(this.handleError('loginByMobile', []))
        );
    }

    /*
    * 通过第三方账号登录
    * */
    public loginBySocial(state: string, code: string): Observable<any> {
        const url = '/auth/mobile/token/social';
        const grant_type = 'mobile';
        const header = new HttpHeaders();
        header.set('isToken', 'false');
        header.set('TENANT_ID', '1');
        header.set('Authorization', AUTHORIZATION);
        return this.http.post<any>(url, {
            mobile: state + '@' + code,
            scope: scope
        }, {
            headers: header
        }).pipe(
            catchError(this.handleError('loginBySocial', []))
        );
    }

    /*
    * 获取登录用户的详情
    * */
    public getUserInfo(): Observable<any> {
        const url = '/admin/user/info';
        return this.http.get<any>(url).pipe(
            catchError(this.handleError('getUserInfo', []))
        );
    }

    /*
    * 用户登出
    * */
    public userLogout(): Observable<any> {
        const url = '/auth/token/logout';
        return this.http.delete<any>(url).pipe(
            catchError(this.handleError('userLogout', []))
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
