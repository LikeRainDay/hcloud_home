import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {OAUTH_ACCESS_TOKEN} from '../data/common/Constant';

const BASE_URL = 'http://localhost:10000';

/**
 *  @link BASE_URL 是全局api 请求的总地址前缀
 *  <p> 此拦截器对全局接口 进行增加baseurl 并设置 localstorage 存储的数据内容
 * */
@Injectable()
export class BseInterceptorService implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            url: `${req.url}`,
            headers: sessionStorage.hasOwnProperty(OAUTH_ACCESS_TOKEN)
                ? req.headers.set('Authorization', `Bearer ${sessionStorage.getItem(OAUTH_ACCESS_TOKEN)}`) : req.headers
        });

        // send cloned request with header to the next handler.
        return next.handle(newReq)
            .pipe(
                /*失败时重试2次，可自由设置*/
                retry(2),
                /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/
                catchError(this.handleError)
            );
    }

    /**
     * 异常信息错误 控制台打印
     * */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
