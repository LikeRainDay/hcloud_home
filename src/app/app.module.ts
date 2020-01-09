import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LandingComponent} from './pages/landing/landing.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {NavbarComponent} from './pages/shared/navbar/navbar.component';
import {FooterComponent} from './pages/shared/footer/footer.component';

import {LoginComponent} from './pages/login/login.component';
import {PriceComponent} from './pages/price/price.component';
import {DocumentComponent} from './pages/document/document.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TreeModule} from 'ng2-tree';
import {LoginApiService} from './@service/login-api.service';
import {BseInterceptorService} from './@service/@interceptor/base-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LandingComponent,
        ProfileComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        PriceComponent,
        DocumentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TreeModule,
        MarkdownModule.forRoot(
            {
                loader: HttpClient,
                markedOptions: {
                    provide: MarkedOptions,
                    useValue: {
                        gfm: true,
                        tables: true,
                        breaks: false,
                        pedantic: false,
                        sanitize: false,
                        smartLists: true,
                        smartypants: false,
                    }
                }
            }
        ),
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [
        LoginApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BseInterceptorService,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
