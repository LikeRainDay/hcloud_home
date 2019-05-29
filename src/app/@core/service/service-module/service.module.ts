import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';
import {CaptureService} from '../capture.service';


const SERVICES = [
    AuthService,
    UserService,
    CaptureService
];

@NgModule({
    providers: [
        ...SERVICES
    ],
    imports: [
        CommonModule
    ]
})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ServiceModule,
            providers: [
                ...SERVICES,
            ],
        };
    }

}
