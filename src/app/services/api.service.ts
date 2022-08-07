import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Quotes} from '../models/quotes';

@Injectable()
export class ApiService {
    // URL base de la api rest
    private URL_BASE = 'http://localhost:3020/';
    //private URL_BASE = 'http://134.122.20.152:3020/';

    constructor(private _router: Router,
                private _http: HttpClient) {
    }

    /**
     * Peticiones de Sesión de usuario
     */
    getUsers(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'users/', {headers});
    }

    login(data): Observable<any> {
        return this._http.post(this.URL_BASE + 'auth/login', data);
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['/']).then(response => {
            console.log(response);
        });
    }

    validate(): Observable<any> {
        let token = localStorage.getItem('token');
        if (!token) {
            token = 'notoken';
        }
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'auth/validate', {headers});
    }

    info(): Observable<any> {
        let token = localStorage.getItem('token');
        if (!token) {
            token = 'notoken';
        }
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'auth/info', {headers});
    }

    createUser(user): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'users/register', user, {headers});
    }

    updateContactInformation(data): Observable<any> {
        let token = localStorage.getItem('token');
        if (!token) {
            token = 'notoken';
        }
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'auth/contact', data, {headers});
    }

    updatePassword(data): Observable<any> {
        let token = localStorage.getItem('token');
        if (!token) {
            token = 'notoken';
        }
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'auth/password', data, {headers});
    }

    deleteUser(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'users/' + id, {headers});
    }

    /**
     * Peticiones de Presupuestos
     */
    getBudgets(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'budgets/', {headers});
    }

    getBudgetsByRut(rut): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'budgets/rut/' + rut, {headers});
    }

    getBudget(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'budgets/' + id, {headers});
    }

    createBudget(budget): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'budgets/', budget, {headers});
    }

    updateBudget(budget): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'budgets/', budget, {headers});
    }

    deleteBudget(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'budgets/' + id, {headers});
    }

    /**
     * Peticiones de Tratamientos
     */
    getTreatments(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'treatments/', {headers});
    }

    getTreatment(_id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'treatments/' + _id, {headers});
    }

    createTreatments(treatments): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'treatments/', treatments, {headers});
    }

    updateTreatments(treatments): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'treatments/', treatments, {headers});
    }

    deleteTreatments(_id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'treatments/' + _id, {headers});
    }

    /**
     * Peticiones de Cliente
     */
    getPatientsRut(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'patients/ruts/', {headers});
    }

    getPatients(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'patients/', {headers});
    }

    getPatient(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'patients/' + id, {headers});
    }

    getPatientByRut(rut): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'patients/rut/' + rut, {headers});
    }

    createPatient(patient): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'patients/', patient, {headers});
    }

    updatePatient(patient): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'patients/', patient, {headers});
    }

    deletePatient(rut): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'patients/' + rut, {headers});
    }

    /**
     * Peticiones de Quotes
     */
    getQuotes(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'quotes/', {headers});
    }

    getQuote(_id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'quotes/' + _id, {headers});
    }

    getQuotesPatient(patient): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'quotes/patient/' + patient, {headers});
    }

    getQuotesDentist(rut_dentists): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'quotes/rut_dentists/' + rut_dentists, {headers});
    }

    createQuote(quote): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'quotes/', quote, {headers});
    }

    updateQuote(quote): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'quotes/', quote, {headers});
    }

    deleteQuote(_id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'quotes/' + _id, {headers});
    }

    /**
     * Peticiones de Dentistas
     */
    getDentistRut(): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.URL_BASE + 'dentists/ruts/', {headers});
    }

    getDentists(): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.URL_BASE + 'dentists/', {headers});
    }

    getDentist(id): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.URL_BASE + 'dentists/' + id, {headers});
    }

    getDentistByRut(rut): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.URL_BASE + 'dentists/rut/' + rut, {headers});
    }

    createDentist(patient): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.post(this.URL_BASE + 'dentists/', patient, {headers});
    }

    updateDentist(patient): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.put(this.URL_BASE + 'dentists/', patient, {headers});
    }

    deleteDentist(rut): Observable<any> {
        let token = localStorage.getItem('token');
    token = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.delete(this.URL_BASE + 'dentists/' + rut, {headers});
    }

    /**
     * Insumos de tratamientos
     */
     getSupplies(): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'supplies/', {headers});
    }

    getSupplie(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'supplies/' + id, {headers});
    }

    createSupplie(supplie): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(this.URL_BASE + 'supplies/', supplie, {headers});
    }

    updateSupplie(supplie): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.put(this.URL_BASE + 'supplies/', supplie, {headers});
    }

    deleteSupplie(id): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.delete(this.URL_BASE + 'supplies/' + id, {headers});
    }

    getSupplieByTreatement(code): Observable<any> {
        let token = localStorage.getItem('token');
        token = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.URL_BASE + 'supplies/code/' + code, {headers});
    }

}