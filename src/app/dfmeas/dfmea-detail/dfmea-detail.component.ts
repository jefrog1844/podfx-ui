import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import {DfmeasService} from '../dfmeas.service';
import { Dfmea } from '../dfmea';

@Component({
  selector: 'app-dfmea-detail',
  templateUrl: './dfmea-detail.component.html',
  styleUrls: ['./dfmea-detail.component.css']
})
export class DfmeaDetailComponent implements OnInit {
  dfmea$: Observable<Dfmea>;
today: Date = new Date(Date.now());
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: DfmeasService
  ) { }

  ngOnInit() {
    this.dfmea$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.api.getDfmea(params.get('dfmeaId')))
    );
  }

  isActive(instruction: string): boolean {
    return this.router.url.endsWith(instruction);
  }
}
