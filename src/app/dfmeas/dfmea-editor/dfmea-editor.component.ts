import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Dfmea} from '../dfmea';

@Component({
    selector: 'app-dfmea-editor',
    templateUrl: './dfmea-editor.component.html',
    styleUrls: ['./dfmea-editor.component.css']
})
export class DfmeaEditorComponent {
    private _dfmea: Dfmea = new Dfmea();
    private addCheck: boolean;

    dfmeaForm = new FormGroup({
        id: new FormControl(''),
        number: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        originator: new FormControl('', [Validators.required]),
        originated: new FormControl(''),
        revision: new FormControl(''),
        revised: new FormControl(''),
        teamMembers: new FormControl(''),
        partNumber: new FormControl('', [Validators.required]),
        deleteDfmeaControl: new FormControl({value: '', disabled: true})
    });

    @Input()
    set dfmea(dfmea: Dfmea) {
        if (dfmea) {
            this._dfmea = dfmea;
            this.addCheck = false;

            this.dfmeaForm.get('id').setValue(dfmea.id);
            this.dfmeaForm.get('number').setValue(dfmea.number);
            this.dfmeaForm.get('title').setValue(dfmea.title);
            this.dfmeaForm.get('type').setValue(dfmea.type);
            this.dfmeaForm.get('originator').setValue(dfmea.originator);
            this.dfmeaForm.get('originated').setValue(dfmea.originated);
            this.dfmeaForm.get('revision').setValue(dfmea.revision);
            this.dfmeaForm.get('revised').setValue(dfmea.revised);
            this.dfmeaForm.get('teamMembers').setValue(dfmea.teamMembers);
            this.dfmeaForm.get('partNumber').setValue(dfmea.partNumber);
            this.dfmeaForm.get('deleteDfmeaControl').enable();
            this.dfmeaForm.get('deleteDfmeaControl').enable();
            this.dfmeaForm.get('number').disable();
        }
    }

    @Output() add = new EventEmitter<Dfmea>();
    @Output() update = new EventEmitter<Dfmea>();
    @Output() delete = new EventEmitter<number>();

    constructor(public datepipe: DatePipe) {
        this.addCheck = true;
    }

    onSubmit() {
        if (this.dfmeaForm.valid) {
            if (this.addCheck) {
                let latest_date = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
                this.dfmeaForm.get('originated').setValue(latest_date);
                this.dfmeaForm.get('revised').setValue(latest_date);
                this.dfmeaForm.get('revision').setValue(1);
                this.dfmeaForm.get('id').setValue(0);
                this.add.emit(this.dfmeaForm.value);
            } else if (this.dfmeaForm.get('deleteDfmeaControl').value && this.dfmeaForm.get('id').value) {
                this.delete.emit(this._dfmea.id);
            } else {
                this.update.emit(this.dfmeaForm.value)
            }
            this.reset();
        }
    }

    onCancel() {
        this.reset();
    }

    reset() {
        this.dfmeaForm.reset({
            id: '',
            number: {value: '', disabled: false},
            title: '',
            type: '',
            originator: '',
            originated: '',
            revision: '',
            revised: '',
            teamMembers: '',
            partNumber: '',
            deleteFactorControl: {value: '', disabled: true}
        });

        this.addCheck = true;
    }
}
