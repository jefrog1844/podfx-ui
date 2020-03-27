import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Factor} from '../factor';

@Component({
    selector: 'app-factors-list',
    templateUrl: './factors-list.component.html',
    styleUrls: ['./factors-list.component.css']
})
export class FactorsListComponent {

    @Input()
    title: string;

    @Input()
    category: string;

    private _factors: Array<Factor> = new Array<Factor>();

    @Input()
    set factors(factors: Factor[]) {
        this._factors = factors;
    }

    get factors() {
        if (this._factors) {
            return this._factors.filter(f => f.category === this.category);
        }
    }

    @Output() selected = new EventEmitter<string>();

    constructor() {}

    onSelect(factorId: string) {
        this.selected.emit(factorId);
    }

}
