import {Injectable} from '@angular/core';
import {RegisterUserInfo, User, UserData} from '../data/User.data';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseRequestResult} from '../data/common/BaseRequestResult';
import {catchError} from 'rxjs/operators';
import {APP_TENANT_ID, APP_USER_ID, OAUTH_ACCESS_TOKEN, OAUTH_REFRSH_TOKEN} from '../data/common/constant.common';

@Injectable({
    providedIn: 'root'
})
export class UserService extends UserData {

    public currentUser: Observable<any>;

    private currentUserSubject: BehaviorSubject<User>;

    constructor(private  http: HttpClient) {
        super();
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * @des 获取当前用户信息 存放到全局的观察者
     * @author houshuai
     * @date 2019/5/29
     */
    getCurrentUser() {
        const url = '/api/admin/user/info';
        this.http.get<any>(url).subscribe(res => {
            this.currentUserSubject.next(res);
        });
    }

    /**
     * @des 获取当前用户的信息  返回观察者
     * @author houshuai
     * @date 2019/5/29
     */
    getCurrentUserInfo(): Observable<BaseRequestResult<User>> {
        const url = '/api/admin/user/info';
        return this.http.get<any>(url).pipe(
            catchError(this.handleError('getUserInfo', []))
        );
    }

    isLogin(): boolean {
        let isLogin = false;
        this.currentUser.subscribe(res => {
            if (res) {
                isLogin = res.code === 0;
            }
        });
        return isLogin;
    }

    logOut() {
        const url = '/api/auth/token/logout';
        this.http.delete<any>(url).subscribe(res => {
            if (res.code === 0) {
                this.currentUserSubject.next(null);
                this.clearTokenToSession();
            } else {
                console.log('登出失败');
            }
        });
    }

    /**
     * @des 账号密码形式注册
     * @author houshuai
     * @date 2019/5/29
     * @param registerInfo 注册信息
     */
    registerByPassword(registerInfo: RegisterUserInfo): Observable<any> {
        const url = '/api/admin/user/password/add';
        return this.http.post<any>(url, registerInfo).pipe(
            catchError(this.handleError('loginByMobile', []))
        );
    }

    /**
     * @des 电话号码注册
     * @author houshuai
     * @date 2019/5/29
     * @param registerInfo 注册信息
     */
    registerByPhone(registerInfo: RegisterUserInfo): Observable<any> {
        const url = '/api/admin/user/phone/add';
        return this.http.post<any>(url, registerInfo).pipe(
            catchError(this.handleError('loginByMobile', []))
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

    /**
     * @des 移除登出后的所有session存储的用户相关信息
     * @author houshuai
     * @date 2019/5/29
     */
    protected clearTokenToSession() {
        sessionStorage.removeItem(OAUTH_ACCESS_TOKEN);
        sessionStorage.removeItem(OAUTH_REFRSH_TOKEN);
        sessionStorage.removeItem(APP_USER_ID);
        sessionStorage.removeItem(APP_TENANT_ID);
    }
}
