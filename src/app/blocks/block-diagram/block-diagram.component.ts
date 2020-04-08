import {Component, Output, Input, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

import {Block} from '../block';

@Component({
    selector: 'app-block-diagram',
    templateUrl: './block-diagram.component.html',
    styleUrls: ['./block-diagram.component.css']
})
export class BlockDiagramComponent {

    key: string = "children";

    @Input() blocks$: Observable<Block[]>;
    @Output() selected = new EventEmitter<number>();

    constructor() {}

    onSelect(id: number) {
        this.selected.emit(id);
    }

}
