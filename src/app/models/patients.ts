export interface Patients {
    _id?: string;
    rut: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    address: string;
    city: string;
    country: string;
    birthdate: string;
    gender: string;
    dateOfBirth: Date;
    background: {
        pregnancy: boolean;
        epilepsy: boolean;
        hypertension: boolean;
        diabetes: boolean;
        heartDisease: boolean;
        allergy: boolean;
        Onychophagia: boolean;
        swallowing: boolean;
        fingerSuction: boolean;
        others: string;
    };
}
