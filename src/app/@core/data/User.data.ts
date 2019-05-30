import {Observable} from 'rxjs';
import {BaseRequestResult} from './common/BaseRequestResult';
import {BaseService} from '../service/base.service';

export interface User {
    permission: [string];

    sysUser: UserInfo;
}

export interface UserInfo {
    userId: number;
    username: string;
    password: string;
    createTime: string;
    updateTime: string;
    phone: string;
    avatar: string;
    tenantId: number;
    deptId: number;
}

export interface RegisterUserInfo {
    username: string;
    password: string | null;
    code: string;
    email: string | null;
    phone: string | null;
    sessionId: string | null;
}


export abstract class UserData extends BaseService {

    abstract getCurrentUserInfo(): Observable<BaseRequestResult<User>>;

    abstract isLogin(): boolean;

    abstract registerByPassword(registerInfo: RegisterUserInfo): Observable<any>;

    abstract registerByPhone(registerInfo: RegisterUserInfo): Observable<any>;
}

