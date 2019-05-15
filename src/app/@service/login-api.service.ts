import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {JSEncrypt} from '../../jslibs/jsencrypt/jsencrypt';
import {encode} from 'punycode';

const scope = 'server';
const AUTHORIZATION = 'Basic aGNsb3VkOmhjbG91ZF9zZWN1cml0eQ==';

@Injectable({
    providedIn: 'root'
})
export class LoginApiService {

    jsEncrypt: JSEncrypt;

    publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxxCSrFW0M+Kx5lP8qzgEIX40Ep5ErbmIbGxoGmBXcU5tIOv' +
        'xTAEqa+GUo1MwwNZwzwPt2g4eqHQt1v7XHLuyfKNbAD81YfjzC2UUKJnmdC6SpkXWIa2xjeALrK6Pbb0QONtIAxP1siVi5xNLudCQ' +
        'nGgHHFX5HkH1PsDylBNX0qHeqH7dkVhNTIU325ggtO9g8j8bF0PzkBmo6oP4rXgxbgT9lg4B3YOk1YRs77EWNoSCTcW1W+IgNfCQ3u' +
        'C9CcPB8t9KqPA/eupP1MaCfbmHoodx+31zMXWkipniXoE73DlLETHvYyP4MXXNYrSPBGx4XmYqXspsAaMd6K+yj1NZcQIDAQAB';

    private = 'MIIEowIBAAKCAQEAxxCSrFW0M+Kx5lP8qzgEIX40Ep5ErbmIbGxoGmBXcU5tIOvxTAEqa+GUo1MwwNZwzwPt2g4eqHQt1' +
        'v7XHLuyfKNbAD81YfjzC2UUKJnmdC6SpkXWIa2xjeALrK6Pbb0QONtIAxP1siVi5xNLudCQnGgHHFX5HkH1PsDylBNX0qHeqH7' +
        'dkVhNTIU325ggtO9g8j8bF0PzkBmo6oP4rXgxbgT9lg4B3YOk1YRs77EWNoSCTcW1W+IgNfCQ3uC9CcPB8t9KqPA/eupP1MaCfb' +
        'mHoodx+31zMXWkipniXoE73DlLETHvYyP4MXXNYrSPBGx4XmYqXspsAaMd6K+yj1NZcQIDAQABAoIBAFtxMH87q1i+RQxR /lpElBk' +
        'ymQcIbvICrTlpHvUm1mQ1K4oY+DH6wxrld9sCxv1+RDnES0mEfO7S14/QZs5LJnV8sLvPTV1g93x/hSAVejhagIEiyXeVC1/p0FMVq' +
        'Ms3MzF7AXxwecfIxsLxKTMFLLi8TK/milYs5FRcW9JLhGc7ptrd0k7pkNEZ51Du9dr6WwlaW7p+p0G/sv7OKWZgt3wdI0DwaG0Ex/' +
        'IvIcGQ7XAgfgbbbkuMRth6RCZckne0JgZHXDLdBuCffMsmrH9dm/wGf5dx6DlKksj3tvaCcHBGpWOQ9eHcTqMgMSBDLipZ5ANok5px' +
        'P4HxA+kU602N1AECgYEA5LVnY+NiAvR1lGrsBqQyjDt9i3X4TbkbwsgNfQZQuaWPUroSfa0VB8ptdsllg6ov0Ba7v+0t60tgmmbGsa' +
        'hB87kpQ7qUdovbOs99FCGlod7zPv0LCkbOib3wbwIc5SSE7q9k1jQpPQp+Y9hYPBX0t24u5G5LGmT+Iu961KwdycECgYEA3tGbfeQd' +
        'J25geEcCzCopWEibIfpOwPRLpApjTBZ/ukYev9HonB1W/acWSCBnqOL3P8VeJrpSQlzMYkFMcCVWy/xAoZeWD+P+H1jY8ueNaRrQHD' +
        'AWJh6Pbhq2QfHbFUJwh94T8BQqgiYrJ4PPbuMBJrk6D/ENJEt018jsuBxTm7ECgYEAmJKLzo86K055wfEyU5vmPLbTId4pL3B1nJNo' +
        'rCcyYyaXXlDTVRPKG9BnBf+EwTkffGouBfNr1rQKVfaKRqpAlR7I8G3f7NWQAsO4ZV2s6TeafkLAwrJJxon3g5adQCAErlZDpsJVYG' +
        'tHtcP12N+syVGv5qPNZmZJQ3UPNCE+HgECgYAEM8fO9AJov/gpzI0M9K6a76OdXG8nzHOwwFFnGfWGudPSok7UwujlF8Wfzpyl3sHy' +
        '/fHsoQ70GXPxVnHum4WrizJc2dMGsbIVPUO6MQvFs6/BGFcSmPjzhqVxUPJk0D/3EAUoPfkfQ0EFGcNLwBRBerTRoCYzTQkDGNL+Fe' +
        'qtwQKBgAYRsQA4mXzfWEbSeV+/lMzL9XuAWCFJKHNvueIbDjurh6xETh28/yuezrrjagwTgsC5wINREGzD7jtk9C+lFe2YjwdIuWtC' +
        'JcLj0DdGh+EszOiGEmnFk9TEtZ2TtfBClasYK6+SVYP2FgLv1tu3sYAvlUqNX4/nPxD5yKgUw6Us';

    constructor(private  http: HttpClient) {
        this.jsEncrypt = new JSEncrypt({
            default_key_size: 2048
        });
    }

    private decryptClick(inputValue: string): string {
        this.jsEncrypt.setPrivateKey(this.private);
        return this.jsEncrypt.decrypt(inputValue).toString();
    }

    private encryptClick(inputValue: string): string {
        this.jsEncrypt.setPrivateKey(this.private);
        const rsa = this.jsEncrypt.encrypt(inputValue);
        return rsa.toString();
    }

    /*
    * desc: 通过用户密码登录
    * */
    public loginByPassword(username: string, password: string, code: string, randomStr: string): Observable<any> {
        const url = '/auth/oauth/token';
        const grant_type = 'password';
        const urlEncode = encodeURIComponent(this.encryptClick(password));
        const header = new HttpHeaders()
            .set('isToken', 'false')
            .set('Authorization', AUTHORIZATION)
            .set('TENANT_ID', '1');
        return this.http.get<any>(
            `${url}?username=${username}&password=${urlEncode}&code=${code}&grant_type=${grant_type}&scope=${scope}`, {
                headers: header
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
