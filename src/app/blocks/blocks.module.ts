import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {EditBlockComponent} from './edit-block/edit-block.component';
import {AddBlockComponent} from './add-block/add-block.component';
import {BlocksComponent} from './blocks/blocks.component';
import {BlockDiagramComponent} from './block-diagram/block-diagram.component';

@NgModule({
    declarations: [
        BlocksComponent,
        EditBlockComponent,
        AddBlockComponent,
        BlockDiagramComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class BlocksModule {}
