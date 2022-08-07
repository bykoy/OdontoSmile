import {PatientsQuotes} from './patientsQuotes';

export interface Quotes {
    _id?: string;
    startDay: Date;
    endDay: Date;
    patient: PatientsQuotes;
    description: string;
    state: boolean;
    payment: number;
    rut_dentists: string;
}
