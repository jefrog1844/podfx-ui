import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {Dfmea} from '../dfmea';

@Component({
    selector: 'app-dfmea-search',
    templateUrl: './dfmea-search.component.html',
    styleUrls: ['./dfmea-search.component.css']
})
export class DfmeaSearchComponent {

    private _searchSubject = new Subject<string>();

    @Input() searchResults$: Observable<Dfmea[]>;
    @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

    constructor() {this._setSearchSubscription()}

    // Push a search term into the observable stream.
    onSearch(term: string): void {
        this._searchSubject.next(term);
    }

    private _setSearchSubscription(): void {
        this._searchSubject.pipe(
            // wait 700ms after each keystroke before considering the term
            debounceTime(700),

            // ignore new term if same as previous term
            distinctUntilChanged()
        ).subscribe((term: string) => {
            this.searchTerm.emit(term);
        });
    }

}
