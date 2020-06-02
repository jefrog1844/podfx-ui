import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

import {Funktion} from "../funktion";

@Component({
  selector: 'app-funktions-list',
  templateUrl: './funktions-list.component.html',
  styleUrls: ['./funktions-list.component.css']
})

export class FunktionsListComponent {

    @Input() funktions$: Observable<Funktion[]>;

    @Output() selected = new EventEmitter<number>();

    constructor() {}

    select(funktionId: number) {
        this.selected.emit(funktionId);
    }

}
