import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FunktionsComponent } from './funktions/funktions.component';
import { FunktionDetailComponent } from './funktion-detail/funktion-detail.component';
import { FunktionsListComponent } from './funktions-list/funktions-list.component';



@NgModule({
    declarations: [
        FunktionsComponent,
        FunktionDetailComponent,
        FunktionsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FunktionsModule { }
