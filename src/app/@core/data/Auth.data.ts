import {Observable} from 'rxjs';
import {BaseService} from '../service/base.service';

export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    dept_id: number;
    license: string;
    username: string;
    user_id: number;
    tenant_id: number;
    token_type: string;
    scope: string;
}

export abstract class AuthData extends BaseService {
    abstract getTokenByPassword(username: string, password: string, code: string): Observable<Token>;

    abstract getTokenByMobile(mobile: string, code: string): Observable<Token>;

    abstract getTokenBySocial(state: string, code: string): Observable<Token>;

    abstract getRefreshToken(refresh_token: string): Observable<Token>;
}
