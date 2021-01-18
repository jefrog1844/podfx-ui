import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { DfmeasService } from '../dfmeas.service';
import { Dfmea } from '../dfmea';
import { AlertsService } from '../../alerts/alerts.service';


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

    constructor(private api: DfmeasService, private router: Router, private alertsService: AlertsService) { }

    ngOnInit() {
        this.getDfmeas();
    }

    getDfmeas(): void {
        const sub = this.api.findAll().subscribe(dfmeas => {
            this._dfmeas.next(dfmeas);
        });
        this.unsubscribe.add(sub);
    }

    deleteDfmea(id: number): void {
        const delSub = this.api.delete(id).subscribe(() => {
            this.selectedDfmea$ = null;
            this.getDfmeas();
        });
        this.unsubscribe.add(delSub);
    }

    add(dfmea: Dfmea) {
        const addSub = this.api.create(dfmea).subscribe(dfmea => {
                this.getDfmeas();
            });
        this.unsubscribe.add(addSub);
    }

    update(dfmea: Dfmea) {
        // reset alerts on submit
        this.alertsService.clear();

        const msg = `Update successful: ${dfmea.title}`;
        const updateSub = this.api.update(dfmea.id, dfmea).subscribe(() => {
                this.getDfmeas();
                
                this.alertsService.success(msg);
            });
        this.unsubscribe.add(updateSub);
    }

    delete(dfmeaId: number) {
        const delSub = this.api.delete(dfmeaId).subscribe(dfmea => {
                this.selectedDfmea$ = null;
                this.getDfmeas();
            });
        this.unsubscribe.add(delSub);
    }

    selectDfmea(dfmeaId: number) {
        this.selectedDfmea$ = this.api.findOne(dfmeaId);
    }

    search(term: string) {
        this.searchResults$ = this.api.search('title',term);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
