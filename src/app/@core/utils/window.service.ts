import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowService {

    constructor() {
    }

    /**
     * @des 打开一个用大小的窗口
     * @author houshuai
     * @date 2019/5/27
     * @param url 地址
     */
    openWindowWithSize(url: string) {
        const width = 600;
        const height = 400;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(url, '_blank',
            'toolbar=yes,' +
            'location=yes, ' +
            'directories=no, ' +
            'status=no, ' +
            'menubar=yes, ' +
            'scrollbars=yes,' +
            'resizable=no, ' +
            'copyhistory=yes,' +
            'left=' + left + ', top=' + top + ', width=' + width + ', height=' + height);
    }

    /**
     * @des 新开页面窗口
     * @author houshuai
     * @date 2019/5/27
     * @param url 地址
     */
    openWindowNoSize(url: string) {
        window.open(url);
    }
}
