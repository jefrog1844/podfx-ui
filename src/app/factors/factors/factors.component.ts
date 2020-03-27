import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { FactorsService } from '../factors.service';
import { BlocksService } from '../../blocks/blocks.service';
import { Factor } from '../factor';
import { BlockId } from '../../blocks/blockId';

@Component({
    selector: 'app-factors',
    templateUrl: './factors.component.html',
    styleUrls: ['./factors.component.css']
})
export class FactorsComponent implements OnInit, OnDestroy {
    _factors = new Subject<Factor[]>();
    factors$ = this._factors.asObservable();
    selectedDfmeaId: string;
    selectedFactor$: Observable<Factor>;
    blockIds$: Observable<BlockId[]>;
    private unsubscribe: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: FactorsService,
        private blocksService: BlocksService) {

    }

    ngOnInit() {
        this.selectedDfmeaId = this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.getFactors();
        this.getBlocks();
    }

    getFactors() {
        const sub = this.api.getFactors(this.selectedDfmeaId).subscribe(factors => {
            this._factors.next(factors)
        });
        this.unsubscribe.add(sub);
    }

    getBlocks() {
        this.blockIds$ = this.blocksService.getBlockIds(this.selectedDfmeaId);
    }

    selectFactor(factorId: string) {
        this.selectedFactor$ = this.api.getFactor(this.selectedDfmeaId, factorId);
    }

    update(factor: Factor) {
        const updateSub = this.api.updateFactor(this.selectedDfmeaId, factor).subscribe(f => {
            this.getFactors();
        });
        this.unsubscribe.add(updateSub);
    }

    add(factor: Factor) {
        factor.dfmeaId = this.selectedDfmeaId;
        factor.id = '';
        const addSub = this.api.addFactor(this.selectedDfmeaId, factor).subscribe(factor => {
            this.getFactors();
        });
        this.unsubscribe.add(addSub);
    }

    delete(factorId: string): void {
        const delSub = this.api.deleteFactor(this.selectedDfmeaId, factorId).subscribe(() => {
            this.selectedFactor$ = null;
            this.getFactors();
        });
        this.unsubscribe.add(delSub);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
