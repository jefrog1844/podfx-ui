import {Factor} from '../factors/factor';
export class Interface {
    constructor() { }
    inputFactor: Factor;
    outputFactor: Factor;
    id: number;
    enabled: boolean;
    physicalConnection: string;
    energyTransfer: string;
    materialExchange: string;
    dataExchange: string;
}