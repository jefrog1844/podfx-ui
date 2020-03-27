import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FactorsListComponent } from './factors-list/factors-list.component';
import { FactorDetailComponent } from './factor-detail/factor-detail.component';
import { FactorsComponent } from './factors/factors.component';

@NgModule({
    declarations: [
        FactorsListComponent,
        FactorDetailComponent,
        FactorsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FactorsModule {}
