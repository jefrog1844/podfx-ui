import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {Block} from '../block';

@Component({
    selector: 'app-add-block',
    templateUrl: './add-block.component.html',
    styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent {
    @Input() dfmeaId: string;
    @Output() add = new EventEmitter<Block>();


    addBlockForm = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(''),
        dfmeaId: new FormControl(''),
        parentId: new FormControl('')
    });

    constructor() {}

    reset() {
        this.addBlockForm.reset();
    }

    addSystemBlock() {
        this.addBlockForm.get('type').setValue('System');
        this.addBlockForm.get('dfmeaId').setValue(this.dfmeaId);
        this.addBlockForm.get('parentId').setValue(0);
        this.add.emit(this.addBlockForm.value);
        this.reset();
    }
}
