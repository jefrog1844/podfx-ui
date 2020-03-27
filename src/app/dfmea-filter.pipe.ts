import {Pipe, PipeTransform} from '@angular/core';
import {Dfmea} from './dfmeas/dfmea';

//pure may be set to false (see angular docs)
@Pipe({
    name: 'dfmeaFilter',
    pure: true
})
export class DfmeaFilterPipe implements PipeTransform {
    /**
     * filter could be a Dfmeea object that is initiated by new Dfmeea()
     * in the component and has input fields bound to the object and then
     * in the applyFilter method, loop through fields on dfmea and compare
     * with fields on the filter object
     * 
     * Could use a search button to eliminate running filter with every
     * key stroke.
     */
     
    transform(dfmeas: Dfmea[], filter: string) {
        if (!dfmeas || !filter) {
            return dfmeas;
        }

        return dfmeas.filter((item: Dfmea) => this.applyFilter(item, filter));
    }

    applyFilter(dfmea: Dfmea, filter: string): boolean {
        var fieldValue = "";
        for (const prop in dfmea) {
            if (dfmea.hasOwnProperty(prop)) {
                fieldValue += dfmea[prop];
                if (fieldValue.match(new RegExp(filter,"i"))) {
                    return true;
                }
            }
        }
        return false;
    }

}
