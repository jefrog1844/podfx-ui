import {FailureMode} from '../failure-modes/failure-mode';

export class Funktion {
    id: number;
    name: string;
    requirement: string;
    modeMap: {
        [key:string]: Funktion
    };
    constructor(){}
}