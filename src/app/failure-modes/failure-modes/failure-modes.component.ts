import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';

import {FailureModesService} from '../failure-modes.service';
import {Matrix} from '../matrix';


@Component({
  selector: 'app-failure-modes',
  templateUrl: './failure-modes.component.html',
  styleUrls: ['./failure-modes.component.css']
})
export class FailureModesComponent implements OnInit, OnDestroy {
    selectedDfmeaId: number;
    _matrix = new Subject<Matrix>();
    matrix$ = this._matrix.asObservable();

    private unsubscribe: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: FailureModesService) {}
  
      ngOnInit() {
        this.selectedDfmeaId = +this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.getMatrix();
    }

    getMatrix() {
        const sub = this.api.getMatrix(this.selectedDfmeaId).subscribe(matrix => {
            this._matrix.next(matrix)
        });
        this.unsubscribe.add(sub);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
