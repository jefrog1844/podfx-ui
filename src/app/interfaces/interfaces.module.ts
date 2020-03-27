import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InterfacesComponent} from './interfaces/interfaces.component';
import {InterfacesDetailComponent} from './interfaces-detail/interfaces-detail.component';
import {InterfacesListComponent} from './interfaces-list/interfaces-list.component';



@NgModule({
    declarations: [InterfacesComponent, InterfacesDetailComponent, InterfacesListComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class InterfacesModule {}
