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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TreeModule} from 'ng2-tree';
import {CoreModule} from './@core/core-modul.module';
import {PhoneComponent} from './pages/signup/phone/phone.component';
import {AccountComponent} from './pages/signup/account/account.component';

const MarkdownProperties = {
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
};

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
        DocumentComponent,
        PhoneComponent,
        AccountComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TreeModule,
        CoreModule.forRoot(),
        MarkdownModule.forRoot(MarkdownProperties),
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
