import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { FunktionsService } from '../funktions.service';
import { Funktion } from '../funktion';

@Component({
  selector: 'app-funktions',
  templateUrl: './funktions.component.html',
  styleUrls: ['./funktions.component.css']
})
export class FunktionsComponent  implements OnInit, OnDestroy {

    unsubscribe: Subscription = new Subscription();
    selectedDfmeaId: number;
    selectedFunktion$: Observable<Funktion>;
    _funktions = new Subject<Funktion[]>();
    funktions$ = this._funktions.asObservable();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: FunktionsService
    ) { }

    ngOnInit() {
        this.selectedDfmeaId = +this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.loadFunktions();
    }

    loadFunktions() {
        const sub = this.api.getFunktionList(this.selectedDfmeaId).subscribe(funktions => {
            this._funktions.next(funktions);
        });
        this.unsubscribe.add(sub);

    }

    update(funktion: Funktion) {
        const updateSub = this.api.updateFunktion(this.selectedDfmeaId, funktion).subscribe(funktion => {
            this.loadFunktions();
        });
        this.unsubscribe.add(updateSub);
    }

    delete(funktionId: number): void {
        const delSub = this.api.deleteFunktion(this.selectedDfmeaId, funktionId).subscribe(() => {
            this.selectedFunktion$ = null;
            this.loadFunktions();
        });
        this.unsubscribe.add(delSub);
    }

    select(funktionId: number) {
        this.selectedFunktion$ = this.api.getFunktion(this.selectedDfmeaId, funktionId);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

}
