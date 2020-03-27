import {Factor} from '../factors/factor';
import {InterfaceDetail} from './interface-detail';
export class Matrix {
    constructor() { }
    inputFactor: Factor;
    externalInterfaces: InterfaceDetail[];
	internalInterfaces: InterfaceDetail[];
}