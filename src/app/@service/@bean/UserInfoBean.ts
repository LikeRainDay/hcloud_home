export class UserInfoBean {

    private permission: [string];

    private sysUser: UserInfo;

}

/**
 * @des: 声明同一个作用域的内部类
 * @author: houshuai
 * @date: 2019/5/20
 * @param:
 */
export class UserInfo {
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
