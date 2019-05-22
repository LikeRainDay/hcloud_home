import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceModule} from './service/service-module/service.module';
import {StorageService} from './utils/storage.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BseInterceptorService} from './interceptor/base-interceptor.service';
import {AuthData} from './data/Auth.data';
import {AuthService} from './service/auth.service';
import {UserData} from './data/User.data';
import {EncrtyService} from './utils/encrty.service';

const DATA_SERVICES = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BseInterceptorService,
        multi: true
    },
    {provide: AuthData, useClass: AuthService},
    {provide: UserData, useClass: UserData}
];

const CORE_PROVIDERS = [
    ...ServiceModule.forRoot().providers,
    StorageService,
    EncrtyService,
    ...DATA_SERVICES
];

@NgModule({
    imports: [
        CommonModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...CORE_PROVIDERS,
            ],
        };
    }

}
