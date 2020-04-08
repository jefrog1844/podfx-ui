import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

import {Dfmea} from '../dfmea';

@Component({
    selector: 'app-dfmea-list',
    templateUrl: './dfmea-list.component.html',
    styleUrls: ['./dfmea-list.component.css']
})

export class DfmeaListComponent {
    
    @Input() dfmeas$: Observable<Dfmea[]>;

    @Output() selected = new EventEmitter<number>();

    constructor() {}

    onSelect(dfmeaId: number) {
        this.selected.emit(dfmeaId);
    }
}