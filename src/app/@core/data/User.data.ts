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


export abstract class UserData {

    abstract getCurrentUser(): Observable<BaseRequestResult<User>>;
}

