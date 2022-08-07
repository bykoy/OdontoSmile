import {TreatmentsBudget} from './treatmentsBudget';

export interface Budgets {
    _id: string;
    patientRut: string;
    date: string;
    totalPrice?: number;
    discount: number;
    treatments: TreatmentsBudget[];
}
