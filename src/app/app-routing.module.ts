import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DfmeasComponent} from './dfmeas/dfmeas/dfmeas.component';
import {DfmeaDetailComponent} from './dfmeas/dfmea-detail/dfmea-detail.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import {FunctionsComponent} from './functions/functions.component';
import {FailureModesComponent} from './failure-modes/failure-modes.component';
import {EffectsComponent} from './effects/effects.component';
import {CausesComponent} from './causes/causes.component';
import {ControlsComponent} from './controls/controls.component';
import {ActionsComponent} from './actions/actions.component';
import {FactorsComponent} from './factors/factors/factors.component';
import {InterfacesComponent} from './interfaces/interfaces/interfaces.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {
        path: 'dfmeas/:dfmeaId',
        component: DfmeaDetailComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {path: 'block-diagram', component: BlocksComponent},
            {path: 'factors', component: FactorsComponent},
            {path: 'matrix', component: InterfacesComponent},
            {path: 'functions', component: FunctionsComponent},
            {path: 'failure-modes', component: FailureModesComponent},
            {path: 'effects', component: EffectsComponent},
            {path: 'causes', component: CausesComponent},
            {path: 'controls', component: ControlsComponent},
            {path: 'actions', component: ActionsComponent},
            {path: '', redirectTo: 'block-diagram', pathMatch: 'full'}
        ]
    },
    {
        path: 'dfmeas',
        component: DfmeasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/dfmeas',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}