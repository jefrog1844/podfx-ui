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

    editForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl({value: '', disabled: true}, [Validators.required]),
        type: new FormControl({value: '', disabled: true}, [Validators.required]),
        parentId: new FormControl({value: '', disabled: true}),
        dfmeaId: new FormControl('',[Validators.required]),
        deleteBlockControl: new FormControl({value: '', disabled: true})
    });

    addForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl({value: '', disabled: true}, [Validators.required]),
        type: new FormControl({value: '', disabled: true}, [Validators.required]),
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
            this.editForm.get('id').setValue(block.id);
            this.editForm.get('name').setValue(block.name);
            this.editForm.get('type').setValue(block.type);
            this.editForm.get('parentId').setValue(block.parentId);
            this.editForm.get('dfmeaId').setValue(block.dfmeaId);
            this.editForm.get('deleteBlockControl').enable();
            this.editForm.get('name').enable();
            this.editForm.get('type').enable();
            this.editForm.get('parentId').enable();

            this.addForm.get('parentId').setValue(block.id);
            this.addForm.get('dfmeaId').setValue(block.dfmeaId);
            this.addForm.get('name').enable();
            this.addForm.get('type').enable();
        }
    }

    @Output() add = new EventEmitter<Block>();
    @Output() update = new EventEmitter<Block>();
    @Output() delete = new EventEmitter<number>();

    constructor() {}

    onSubmit() {
        if (this.editForm.valid) {
            if (this.editForm.get('deleteBlockControl').value && this.editForm.get('id').value) {
                this.delete.emit(this._block.id);
            } else {
                this.update.emit(this.editForm.value)
            }
            this.reset();
        }
    }

    onAdd() {
        if (this.addForm.valid) {
            this.addForm.get('id').setValue(0);
            this.add.emit(this.addForm.value);
            this.reset();
        }
    }

    onCancel() {
        this.reset();
    }
    
    reset() {
        this.addForm.reset({
            id: '',
            name: {value: '', disabled: true},
            type: {value: '', disabled: true},
            dfmeaId: '',
            parentId: ''
        });

        this.editForm.reset({
            id: '',
            name: {value: '', disabled: true},
            type: {value: '', disabled: true},
            dfmeaId: '',
            parentId: {value: '', disabled: true},
            deleteBlockControl: {value: '', disabled: true}
        });
    }
    

}
