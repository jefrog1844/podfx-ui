import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {Funktion} from '../../funktions/funktion'

@Component({
  selector: 'app-failure-modes-detail',
  templateUrl: './failure-modes-detail.component.html',
  styleUrls: ['./failure-modes-detail.component.css']
})
export class FailureModesDetailComponent implements OnInit {

    private _funktion: Funktion;
    
    failureForm = new FormGroup({
        id: new FormControl(''),
        absent: new FormControl(''),
        partial: new FormControl(''),
        intermittent: new FormControl(''),
        excess: new FormControl(''),
        decay: new FormControl(''),
        soon: new FormControl(''),
        late: new FormControl(''),
        incorrect: new FormControl(''),
    });

    @Input()
    set funktion(funktion: Funktion) {
        if (funktion) {
            this.reset();            
            this._funktion = funktion;
            //this.failureForm.patchValue(funktion);
            this.failureForm.get('id').setValue(funktion.id);
            this.failureForm.get('absent').setValue(funktion.failureModes['ABSENT']?funktion.failureModes['ABSENT'].name:'');
            this.failureForm.get('partial').setValue(funktion.failureModes['PARTIAL']?funktion.failureModes['PARTIAL'].name:'');
            this.failureForm.get('intermittent').setValue(funktion.failureModes['INTERMITTENT']?funktion.failureModes['INTERMITTENT'].name:'');
            this.failureForm.get('excess').setValue(funktion.failureModes['EXCESS']?funktion.failureModes['EXCESS'].name:'');
            this.failureForm.get('decay').setValue(funktion.failureModes['DECAY']?funktion.failureModes['DECAY'].name:'');
            this.failureForm.get('soon').setValue(funktion.failureModes['SOON']?funktion.failureModes['SOON'].name:'');
            this.failureForm.get('late').setValue(funktion.failureModes['LATE']?funktion.failureModes['LATE'].name:'');
            this.failureForm.get('incorrect').setValue(funktion.failureModes['INCORRECT']?funktion.failureModes['INCORRECT'].name:'');
            this.failureForm.enable();
        }
    }
    
    get funktion() : Funktion {
        return this._funktion;
    }

    @Output() update = new EventEmitter<Funktion>();
        
    constructor() { }

    ngOnInit() {
        this.reset();
    }

    onSubmit() {
        if (this.failureForm.valid) {
            this.update.emit(this.failureForm.value);
            this.reset();
        }
    }

    reset() {
        this.failureForm.reset();
        this.failureForm.disable();
        this._funktion = null;
    }

    onCancel() {
        this.reset();
    }

}
