/**
 * @des: 服务相关的实体bean内容
 * @author: houshuai
 * @date: 2019/5/16
 */
export interface TokenBean {
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
//
// /**
//  * @des: 基础相应接口
//  * @author: houshuai
//  * @date: 2019/5/20
//  * @param:
//  */
// export interface BaseResonse<T> {
//     code: number;
//     msg: string;
//     data: T;
// }
//
// /**
//  * @des: 用户基本信息
//  * @author: houshuai
//  * @date: 2019/5/20
//  * @param:
//  */
// export interface UserInfoBean {
//     sysUser: string;
//
//
// }