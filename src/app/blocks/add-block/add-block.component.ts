import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {Block} from '../block';

@Component({
    selector: 'app-add-block',
    templateUrl: './add-block.component.html',
    styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent {
    @Input() dfmeaId: number;
    @Output() add = new EventEmitter<Block>();


    addForm = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(''),
        dfmeaId: new FormControl(''),
        parentId: new FormControl('')
    });

    constructor() {}

    reset() {
        this.addForm.reset();
    }
    
    onCancel() {
        this.reset();
    }

    onSubmit() {
        this.addForm.get('type').setValue('System');
        this.addForm.get('dfmeaId').setValue(this.dfmeaId);
        this.addForm.get('parentId').setValue(0);
        this.add.emit(this.addForm.value);
        this.reset();
    }
}
