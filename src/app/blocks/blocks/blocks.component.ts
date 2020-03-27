import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { BlocksService } from '../blocks.service';
import { Block } from '../block';

@Component({
    selector: 'app-blocks',
    templateUrl: './blocks.component.html',
    styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription = new Subscription();
    selectedDfmeaId: string;
    selectedBlock$: Observable<Block>;
    _blocks = new Subject<Block[]>();
    blocks$ = this._blocks.asObservable();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: BlocksService
    ) { }

    ngOnInit() {
        this.selectedDfmeaId = this.route.parent.snapshot.paramMap.get('dfmeaId');
        this.gotoBlockDiagram();
    }

    gotoBlockDiagram() {
        //this.blocks$ = this.api.getBlockDiagram(this.selectedDfmeaId);
        const sub = this.api.getBlockDiagram(this.selectedDfmeaId).subscribe(blocks => {
            this._blocks.next(blocks);
        });
        this.unsubscribe.add(sub);

    }

    update(block: Block) {
        const updateSub = this.api.updateBlock(this.selectedDfmeaId, block).subscribe(block => {
            this.gotoBlockDiagram();
        });
        this.unsubscribe.add(updateSub);
    }

    add(block: Block) {
        const addSub = this.api.addBlock(this.selectedDfmeaId, block).subscribe(block => {
            this.gotoBlockDiagram();
        });
        this.unsubscribe.add(addSub);
    }

    delete(blockId: string): void {
        const delSub = this.api.deleteBlock(this.selectedDfmeaId, blockId).subscribe(() => {
            this.selectedBlock$ = null;
            this.gotoBlockDiagram();
        });
        this.unsubscribe.add(delSub);
    }

    selectBlock(blockId: string) {
        this.selectedBlock$ = this.api.getBlock(this.selectedDfmeaId, blockId);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
