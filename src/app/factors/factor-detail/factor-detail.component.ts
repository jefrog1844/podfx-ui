import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {Factor} from '../factor';
import {BlockId} from '../../blocks/blockId';

@Component({
    selector: 'app-factor-detail',
    templateUrl: './factor-detail.component.html',
    styleUrls: ['./factor-detail.component.css']
})
export class FactorDetailComponent {
    private _factor: Factor = new Factor();
    private addCheck: boolean;
    

    factorForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        dfmeaId: new FormControl(''),
        deleteFactorControl: new FormControl({value: '', disabled: true})
    });

    importForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required])
    });

    @Input() blockIds$: Observable<BlockId>;
    @Input()
    set factor(factor: Factor) {
        if (factor) {
            this._factor = factor;
            this.addCheck = false;
            this.factorForm.get('name').setValue(factor.name);
            this.factorForm.get('type').setValue(factor.type);
            this.factorForm.get('category').setValue(factor.category);
            this.factorForm.get('id').setValue(factor.id);
            this.factorForm.get('dfmeaId').setValue(factor.dfmeaId);
            this.factorForm.get('deleteFactorControl').enable();
        }
    }

    @Output() add = new EventEmitter<Factor>();
    @Output() update = new EventEmitter<Factor>();
    @Output() delete = new EventEmitter<string>();

    constructor() {this.addCheck = true;}

    submitFactor() {
        if (this.factorForm.valid) {
            if (this.addCheck) {
                this.add.emit(this.factorForm.value);
            } else if (this.factorForm.get('deleteFactorControl').value && this.factorForm.get('id').value) {
                this.delete.emit(this._factor.id);
            } else {
                this.update.emit(this.factorForm.value)
            }
            this.reset();
        }
    }

    import() {
        if (this.importForm.valid) {
            let name = this.importForm.get('name').value;
            let type = this.importForm.get('type').value;
            let category = this.importForm.get('category').value;

            let f: Factor = new Factor();
            f.name = name;
            f.type = type;
            f.category = category;
            f.id = '';
            this.add.emit(f);
        }
    }

    reset() {
        this.factorForm.reset({
            name: '',
            type: '',
            category: '',
            id: '',
            deleteFactorControl: {value: '', disabled: true}
        });

        this.addCheck = true;
    }

    cancel() {
        this.reset();
    }
}
