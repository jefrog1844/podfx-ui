import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from '../app-routing.module';

import {DfmeaListComponent} from './dfmea-list/dfmea-list.component';
import {DfmeaDetailComponent} from './dfmea-detail/dfmea-detail.component';
import {DfmeaSearchComponent} from './dfmea-search/dfmea-search.component';
import {DfmeaEditorComponent} from './dfmea-editor/dfmea-editor.component';
import { DfmeasComponent } from './dfmeas/dfmeas.component';

@NgModule({
    declarations: [
        DfmeaListComponent,
        DfmeaDetailComponent,
        DfmeaSearchComponent,
        DfmeaEditorComponent,
        DfmeasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ]
})
export class DfmeasModule {}
