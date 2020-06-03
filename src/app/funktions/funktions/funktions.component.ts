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
    dfmeaId: number;
    funktion$: Observable<Funktion>;
    _funktions = new Subject<Funktion[]>();
    funktions$ = this._funktions.asObservable();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: FunktionsService
    ) { }

    ngOnInit() {
        this.dfmeaId = +this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.funktions();
    }

    funktions() {
        const sub = this.api.getFunktionList(this.dfmeaId).subscribe(funktions => {
            this._funktions.next(funktions);
        });
        this.unsubscribe.add(sub);

    }

    update(funktion: Funktion) {
        const updateSub = this.api.updateFunktion(this.dfmeaId, funktion).subscribe(funktion => {
            this.funktions();
        });
        this.unsubscribe.add(updateSub);
    }

    delete(funktionId: number): void {
        const delSub = this.api.deleteFunktion(this.dfmeaId, funktionId).subscribe(() => {
            this.funktion$ = null;
            this.funktions();
        });
        this.unsubscribe.add(delSub);
    }

    select(funktionId: number) {
        this.funktion$ = this.api.getFunktion(this.dfmeaId, funktionId);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

}
