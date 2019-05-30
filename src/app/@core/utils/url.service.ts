import {Injectable} from '@angular/core';

/**
 * @des URL 解析工具类
 * @author houshuai
 * @date 2019/5/27
 */
@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor() {
    }

    /**
     * @des 获取URL参数
     * @author houshuai
     * @date 2019/5/27
     * @param url 地址
     */
    getUrlParams(url: string) {
        const exist = url.startsWith('#');
        if (exist) {
            url = url.replace('#', '');
        }
        const paramsAndValue = url.split('&');
        const param = {};
        paramsAndValue.forEach(function (element) {
            const key = element.split('=');
            param[key[0]] = key[1];
        });
        return param;
    }
}
