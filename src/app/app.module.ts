import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {DfmeasModule} from './dfmeas/dfmeas.module';
import {BlocksModule} from './blocks/blocks.module';
import {FactorsModule} from './factors/factors.module';
import {InterfacesModule} from './interfaces/interfaces.module';
import {FunktionsModule} from './funktions/funktions.module';
import {FailureModesModule} from './failure-modes/failure-modes.module';
import {AuthModule} from './auth/auth.module';
import {AuthenticationService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';

import {ActionsComponent} from './actions/actions.component';
import {CausesComponent} from './causes/causes.component';
import {ControlsComponent} from './controls/controls.component';
import {EffectsComponent} from './effects/effects.component';

import {JwtAuthInterceptor, ErrorInterceptor } from './shared';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
    declarations: [
        AppComponent,
        ActionsComponent,
        CausesComponent,
        ControlsComponent,
        EffectsComponent,
        AlertsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        AuthModule,
        BlocksModule,
        DfmeasModule,
        FactorsModule,
        InterfacesModule,
        FunktionsModule,
        FailureModesModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,
        AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
