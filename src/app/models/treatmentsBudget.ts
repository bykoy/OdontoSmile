export interface TreatmentsBudget {
    _id?: string;
    name: string;
    price: number;
    ready: boolean;
    readyDate?: string;
    tooth: {
        firstValue: number;
        secondValue: number;
    };
    details: {
        detail: string;
        detailDate?: string;
    };
}
