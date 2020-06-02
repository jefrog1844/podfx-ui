import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


import {InterfaceDetail} from '../interface-detail';

@Component({
    selector: 'app-interfaces-detail',
    templateUrl: './interfaces-detail.component.html',
    styleUrls: ['./interfaces-detail.component.css']
})

export class InterfacesDetailComponent implements OnInit {

    private _selectedInterface: InterfaceDetail;

    interfaceForm = new FormGroup({
        id: new FormControl(''),
        physicalConnection: new FormControl(''),
        energyTransfer: new FormControl(''),
        materialExchange: new FormControl(''),
        dataExchange: new FormControl(''),
        enabled: new FormControl(''),
    });


    @Input()
    set selectedInterface(selectedInterface: InterfaceDetail) {
        if (selectedInterface) {
            this.reset();
            this.interfaceForm.patchValue(selectedInterface);
            this.interfaceForm.enable();
        }
    }

    @Output() update = new EventEmitter<InterfaceDetail>();
    @Output() generate = new EventEmitter<boolean>();

    get selectedInterface() {
        return this._selectedInterface;
    }

    constructor() {}
    
    ngOnInit() {
        this.reset();
    }

    submitInterface() {
        if (this.interfaceForm.valid) {
            this.update.emit(this.interfaceForm.value);
            this.reset();
        }
    }
    
    onGenerate() {
        console.log("onGenerate called!");
        this.generate.emit(true);
    }
    
    reset() {
        this.interfaceForm.reset();
        this.interfaceForm.disable();
    }

    cancel() {
        this.reset();
    }
}