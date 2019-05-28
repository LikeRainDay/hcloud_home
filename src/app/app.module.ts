import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './login/login.component';
import {PriceComponent} from './price/price.component';
import {DocumentComponent} from './document/document.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TreeModule} from 'ng2-tree';
import {CoreModule} from './@core/core-modul.module';
import {PhoneComponent} from './signup/phone/phone.component';
import {AccountComponent} from './signup/account/account.component';

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
