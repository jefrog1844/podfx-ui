import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Matrix} from '../matrix';
import {Interface} from '../interface';


@Component({
    selector: 'app-interfaces-list',
    templateUrl: './interfaces-list.component.html',
    styleUrls: ['./interfaces-list.component.css']
})

export class InterfacesListComponent {

    @Input()
    title: string;

    @Input()
    type: string;

    @Output() selected = new EventEmitter<string>();
    @Output() update = new EventEmitter<Interface>();

    private _matrices: Array<Matrix> = new Array<Matrix>();

    @Input()
    set matrices(matrices: Matrix[]) {
        this._matrices = matrices;
    }

    get matrices() {
        if (this._matrices) {
            return this._matrices;
        }
    }

    constructor() {}

    ngOnInit() {
    }

    onChange(event: any, i: Interface) {
        if(event.target.checked) {
            i.enabled = true;
        } else {
            i.enabled = false;
        }
        //this.update.emit(i);
    }


    onSelect(interfaceId: string) {
        console.log("onSelect(id)= " + interfaceId);

        this.selected.emit(interfaceId);
    }
}