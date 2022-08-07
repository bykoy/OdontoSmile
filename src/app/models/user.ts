export interface User {
    _id?: String,
    rut: String,
    firstName: String,
    lastName: String,
    email: String,
    phone?: String,
    address?: String,
    city?: String,
    country?: String,
    gender: String;
    dateOfBirth: Date;
    role?: String;
}