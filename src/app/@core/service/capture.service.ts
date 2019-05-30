import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BaseRequestResult} from '../data/common/BaseRequestResult';
import {BaseService} from './base.service';
import {catchError} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';

export interface CaptureInfo {
    url: string;
    sessionId: string;
}

/**
 * @des 验证码相关
 * @author houshuai
 * @date 2019/5/29
 */
@Injectable({
    providedIn: 'root'
})
export class CaptureService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * @des 短信验证码
     * @author houshuai
     * @date 2019/5/29
     */
    sendSmsCapture(phone: string): Observable<BaseRequestResult<string>> {
        const url = `/api/admin/mobile/${phone}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError('smsCapture', []))
        );
    }

    /**
     * @des 短信验证码
     * @author houshuai
     * @date 2019/5/29
     */
    getPicCapture(): Observable<CaptureInfo> {
        const sessionId = UUID.UUID();
        const url = `/api/admin/capture?sessionId=${sessionId}`;
        return of({sessionId: sessionId, url: url});
    }
}
