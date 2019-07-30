import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './Components/login/login.component';
import {SubmitComponent} from './Components/submit/submit.component';
import {AppCustomMaterialModule} from './Modules/app-custom-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserService} from './Services/user.service';
import {SubmitService} from './Services/submit.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SubmitComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppCustomMaterialModule,
        FlexLayoutModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
