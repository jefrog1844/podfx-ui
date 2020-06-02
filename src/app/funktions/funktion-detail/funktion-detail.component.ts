import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import { Funktion } from '../funktion';

@Component({
  selector: 'app-funktion-detail',
  templateUrl: './funktion-detail.component.html',
  styleUrls: ['./funktion-detail.component.css']
})
export class FunktionDetailComponent implements OnInit {

    private _selectedFunktion: Funktion;

    funktionForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        requirement: new FormControl(''),
    });


    @Input()
    set selectedFunktion(selectedFunktion: Funktion) {
        if (selectedFunktion) {          
            this.reset();
            this.funktionForm.patchValue(selectedFunktion);
            this.funktionForm.enable();
        }
    }

    @Output() update = new EventEmitter<Funktion>();

    get selectedFunktion() {
        return this._selectedFunktion;
    }

    constructor() {}
    
    ngOnInit() {
        this.reset();
    }

    onSubmit() {
        if (this.funktionForm.valid) {
            this.update.emit(this.funktionForm.value);
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
