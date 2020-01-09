import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LandingComponent} from './pages/landing/landing.component';
import {LoginComponent} from './pages/login/login.component';
import {DocumentComponent} from './pages/document/document.component';
import {PriceComponent} from './pages/price/price.component';
import {NavbarComponent} from './pages/shared/navbar/navbar.component';
import {AuthGuard} from './@core/auth/auth.guard';
import {PhoneComponent} from './pages/signup/phone/phone.component';
import {AccountComponent} from './pages/signup/account/account.component';

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
