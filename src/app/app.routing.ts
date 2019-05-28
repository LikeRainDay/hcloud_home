import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {DocumentComponent} from './document/document.component';
import {PriceComponent} from './price/price.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AuthGuard} from './@core/auth/auth.guard';
import {PhoneComponent} from './signup/phone/phone.component';
import {AccountComponent} from './signup/account/account.component';

const routes: Routes = [
    {path: 'home', component: LandingComponent},
    {path: 'social', component: LandingComponent},
    {path: 'user-profile', component: ProfileComponent},
    {path: 'price', component: PriceComponent},
    {path: 'document', component: DocumentComponent, canActivate: [AuthGuard]},
    {
        path: 'register', component: SignupComponent, children: [
            {path: '', component: AccountComponent},
            {path: 'account', component: AccountComponent},
            {path: 'phone', component: PhoneComponent}
        ]
    },
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'nav', component: NavbarComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
