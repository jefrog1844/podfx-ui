import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Block} from '../block';

@Component({
    selector: 'app-edit-block',
    templateUrl: './edit-block.component.html',
    styleUrls: ['./edit-block.component.css']
})
export class EditBlockComponent {
    private _block: Block;

    editBlockForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl({value: '', disabled: true}, [Validators.required]),
        type: new FormControl({value: '', disabled: true}, [Validators.required]),
        parentId: new FormControl({value: '', disabled: true}),
        dfmeaId: new FormControl('',[Validators.required]),
        deleteBlockControl: new FormControl({value: '', disabled: true})
    });

    addBlockForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        dfmeaId: new FormControl('',[Validators.required]),
        parentId: new FormControl('',[Validators.required])
    });

    get block(): Block {
        return this._block;
    }

    @Input()
    set block(block: Block) {
        if (block) {
            this._block = block;
            this.editBlockForm.get('id').setValue(block.id);
            this.editBlockForm.get('name').setValue(block.name);
            this.editBlockForm.get('type').setValue(block.type);
            this.editBlockForm.get('parentId').setValue(block.parentId);
            this.editBlockForm.get('dfmeaId').setValue(block.dfmeaId);
            this.editBlockForm.get('deleteBlockControl').enable();
            this.editBlockForm.get('name').enable();
            this.editBlockForm.get('type').enable();
            this.editBlockForm.get('parentId').enable();

            this.addBlockForm.get('parentId').setValue(block.id);
            this.addBlockForm.get('dfmeaId').setValue(block.dfmeaId);
        }
    }

    @Output() add = new EventEmitter<Block>();
    @Output() update = new EventEmitter<Block>();
    @Output() delete = new EventEmitter<string>();

    constructor() {}

    updateBlock() {
        if (this.editBlockForm.valid) {
            if (this.editBlockForm.get('deleteBlockControl').value && this.editBlockForm.get('id').value) {
                this.delete.emit(this._block.id);
            } else {
                this.update.emit(this.editBlockForm.value)
            }
            this.reset();
        }
    }

    addChildBlock() {
        if (this.addBlockForm.valid) {
            this.addBlockForm.get('id').setValue('');
            this.add.emit(this.addBlockForm.value);
            this.reset();
        }
    }

    reset() {
        this.addBlockForm.reset({
            id: '',
            name: '',
            type: '',
            dfmeaId: '',
            parentId: ''
        });

        this.editBlockForm.reset({
            id: '',
            name: '',
            type: '',
            dfmeaId: '',
            parentId: '',
            deleteBlockControl: {value: '', disabled: true}
        });
    }

}
