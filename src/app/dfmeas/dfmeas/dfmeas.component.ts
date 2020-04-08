import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { DfmeasService } from '../dfmeas.service';
import { Dfmea } from '../dfmea';


@Component({
    selector: 'app-dfmeas',
    templateUrl: './dfmeas.component.html',
    styleUrls: ['./dfmeas.component.css']
})
export class DfmeasComponent implements OnInit, OnDestroy {
    _dfmeas = new Subject<Dfmea[]>();
    dfmeas$ = this._dfmeas.asObservable();
    searchResults$: Observable<Dfmea[]>;
    selectedDfmea$: Observable<Dfmea>;
    unsubscribe: Subscription = new Subscription();

    constructor(private api: DfmeasService, private router: Router) { }

    ngOnInit() {
        this.getDfmeas();
    }

    getDfmeas(): void {
        const sub = this.api.getDfmeaList().subscribe(dfmeas => {
            this._dfmeas.next(dfmeas);
        });
        this.unsubscribe.add(sub);
    }

    deleteDfmea(id: number): void {
        const delSub = this.api.deleteDfmea(id).subscribe(() => {
            this.selectedDfmea$ = null;
            this.getDfmeas();
        });
        this.unsubscribe.add(delSub);
    }

    add(dfmea: Dfmea) {
        //dfmea.id = '';
        const addSub = this.api.addDfmea(dfmea).subscribe(dfmea => {
                this.getDfmeas();
            });
        this.unsubscribe.add(addSub);
    }

    update(dfmea: Dfmea) {
        const updateSub = this.api.updateDfmea(dfmea).subscribe(dfmea => {
                this.getDfmeas();
            });
        this.unsubscribe.add(updateSub);
    }

    delete(dfmeaId: number) {
        const delSub = this.api.deleteDfmea(dfmeaId).subscribe(dfmea => {
                this.selectedDfmea$ = null;
                this.getDfmeas();
            });
        this.unsubscribe.add(delSub);
    }

    selectDfmea(dfmeaId: number) {
        this.selectedDfmea$ = this.api.getDfmea(dfmeaId);
    }

    search(term: string) {
        this.searchResults$ = this.api.searchDfmeas(term);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
