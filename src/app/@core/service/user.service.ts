import {Injectable} from '@angular/core';
import {User, UserData} from '../data/User.data';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseRequestResult} from '../data/common/BaseRequestResult';
import {catchError} from 'rxjs/operators';

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

    getCurrentUser() {
        const url = '/admin/user/info';
        this.http.get<any>(url).subscribe(res => {
            this.currentUserSubject.next(res);
        });
    }

    getCurrentUserInfo(): Observable<BaseRequestResult<User>> {
        const url = '/admin/user/info';
        return this.http.get<any>(url).pipe(
            catchError(this.handleError('getUserInfo', []))
        );
    }

    isLogin(): boolean {
        let isLogin = false;
        this.currentUser.subscribe(res => {
            isLogin = res.code === 0;
        });
        return isLogin;
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
