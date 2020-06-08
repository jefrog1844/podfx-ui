import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';


import {Funktion} from '../../funktions/funktion';

@Component({
  selector: 'app-failure-modes-list',
  templateUrl: './failure-modes-list.component.html',
  styleUrls: ['./failure-modes-list.component.css']
})
export class FailureModesListComponent {
    
    @Input() funktions$: Observable<Funktion[]>;
    @Output() selected = new EventEmitter<number>();

    constructor() { }

    select(funktionId: number) {
        console.log("funktion id= "+funktionId);
        this.selected.emit(funktionId);
    }

}
