import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../api.service';
import {UserInfoService} from '../user-info.service';

const SERVICES = [
    ApiService,
    UserInfoService
];

@NgModule({
    providers: [
        ...SERVICES
    ],
    imports: [
        CommonModule
    ]
})
export class ServiceModuleModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ServiceModuleModule,
            providers: [
                ...SERVICES,
            ],
        };
    }

}
