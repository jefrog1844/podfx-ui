import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';

import {FailureModesService} from '../failure-modes.service';
import {FunktionsService} from '../../funktions/funktions.service'
import {Funktion} from '../../funktions/funktion';
import {FunktionDetail} from '../../funktions/funktion-detail';


@Component({
  selector: 'app-failure-modes',
  templateUrl: './failure-modes.component.html',
  styleUrls: ['./failure-modes.component.css']
})
export class FailureModesComponent implements OnInit, OnDestroy {
    dfmeaId: number;
    _funktions = new Subject<Funktion[]>();
    funktions$ = this._funktions.asObservable();
    
    funktion$: Observable<Funktion>;
    
    private unsubscribe: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: FailureModesService,
        private funktionsService: FunktionsService) {}
  
    ngOnInit() {
        this.dfmeaId = +this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.getFailureModes();
    }

    getFailureModes() {
        const sub = this.funktionsService.getFunktionList(this.dfmeaId).subscribe(funktions => {
            this._funktions.next(funktions)
        });
        this.unsubscribe.add(sub);
    }
    
    select(funktionId: number) {
        this.funktion$ = this.funktionsService.getFunktion(this.dfmeaId, funktionId);
    }

    update(funktion: FunktionDetail) {
        //const updateSub = this.api.updateFactor(this.selectedDfmeaId, factor).subscribe(f => {
            //this.getFactors();
        //});
        //this.unsubscribe.add(updateSub);
        console.log("in update function of failure-modes.component");
    }
    
    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
