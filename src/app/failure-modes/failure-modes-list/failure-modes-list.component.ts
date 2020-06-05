import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Matrix} from '../matrix';

@Component({
  selector: 'app-failure-modes-list',
  templateUrl: './failure-modes-list.component.html',
  styleUrls: ['./failure-modes-list.component.css']
})
export class FailureModesListComponent {
    
    private _matrix: Matrix = new Matrix();
    
        @Input()
    set matrix(matrix: Matrix) {
        this._matrix = matrix;
    }

    get matrix() {
        if (this._matrix) {
            return this._matrix;
        }
    }
  constructor() { }



}
