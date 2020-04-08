import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';

import {InterfacesService} from '../interfaces.service';
import {Matrix} from '../matrix';
import {InterfaceDetail} from '../interface-detail';

@Component({
    selector: 'app-interfaces',
    templateUrl: './interfaces.component.html',
    styleUrls: ['./interfaces.component.css']
})

export class InterfacesComponent implements OnInit, OnDestroy {

    selectedDfmeaId: number;
    _matrices = new Subject<Matrix[]>();
    matrices$ = this._matrices.asObservable();
    selectedInterface$: Observable<InterfaceDetail>;
    private unsubscribe: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: InterfacesService) {}

    ngOnInit() {
        this.selectedDfmeaId = +this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.getMatrices();
    }

    getMatrices() {
        const sub = this.api.getMatrix(this.selectedDfmeaId).subscribe(matrices => {
            this._matrices.next(matrices)
        });
        this.unsubscribe.add(sub);
    }

    selectInterface(interfaceId: number) {
        this.selectedInterface$ = this.api.getInterfaceDetail(this.selectedDfmeaId, interfaceId);
    }

    update(i: InterfaceDetail) {
        const updateSub =  this.api.updateInterface(this.selectedDfmeaId, i).subscribe(i => {
            this.getMatrices();
        });
        this.unsubscribe.add(updateSub);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
