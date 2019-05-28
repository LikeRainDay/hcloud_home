import {Observable} from 'rxjs';
import {BaseRequestResult} from './common/BaseRequestResult';

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
    password: string;
    code: string;
    email: string;
}


export abstract class UserData {

    abstract getCurrentUserInfo(): Observable<BaseRequestResult<User>>;

    abstract isLogin(): boolean;

    abstract register(registerInfo: RegisterUserInfo): Observable<BaseRequestResult<User>>;
}

