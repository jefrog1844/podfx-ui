import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FailureModesComponent } from './failure-modes/failure-modes.component';
import { FailureModesListComponent } from './failure-modes-list/failure-modes-list.component';
import { FailureModesDetailComponent } from './failure-modes-detail/failure-modes-detail.component';



@NgModule({
  declarations: [
        FailureModesComponent,
        FailureModesListComponent,
        FailureModesDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
  ]
})
export class FailureModesModule { }
