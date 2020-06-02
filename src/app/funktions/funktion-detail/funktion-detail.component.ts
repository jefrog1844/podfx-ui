import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import { Funktion } from '../funktion';

@Component({
  selector: 'app-funktion-detail',
  templateUrl: './funktion-detail.component.html',
  styleUrls: ['./funktion-detail.component.css']
})
export class FunktionDetailComponent implements OnInit {

    private _funktion: Funktion = new Funktion();

    funktionForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        requirement: new FormControl(''),
        deleteControl: new FormControl({value: '', disabled: true})
    });


    @Input()
    set selectedFunktion(selectedFunktion: Funktion) {
        if (selectedFunktion) {          
            this.reset();
            this._funktion = selectedFunktion;
            this.funktionForm.patchValue(selectedFunktion);
            this.funktionForm.get('deleteControl').enable();
            this.funktionForm.enable();
        }
    }

    @Output() update = new EventEmitter<Funktion>();
    @Output() delete = new EventEmitter<number>();

    get selectedFunktion() {
        return this._funktion;
    }

    constructor() {}
    
    ngOnInit() {
        this.reset();
    }

    submit() {
        if (this.funktionForm.valid) {
            if (this.funktionForm.get('deleteControl').value && this.funktionForm.get('id').value) {
                this.delete.emit(this._funktion.id);
            } else {
                this.update.emit(this.funktionForm.value);
            }
            this.reset();  
        }          
    }
    
    reset() {
        this.funktionForm.reset();
        this.funktionForm.disable();
    }

    cancel() {
        this.reset();
    }

}
