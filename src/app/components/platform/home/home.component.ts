import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Patients} from '../../../models/patients';
import {Budgets} from '../../../models/budgets';
import {Quotes} from '../../../models/quotes';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    user = JSON.parse(localStorage.getItem('user'));
    myDate = new Date();

    patients: Patients[];
    budgets: Budgets[];
    quotes: Quotes[];
    quotesP: Array<Quotes> = [];

    totalPatient = 0;
    totalBudgets = 0;
    totalQuotes = 0;

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _apiService: ApiService,
        private dialog: MatDialog) {
}

    ngOnInit() {
        this.utcTime();

        //Busqueda de pacientes ingresdos
        this._apiService.getPatients().subscribe(response => {
            if (response.data) {
                const pat = response.data;
                this.patients = pat.reverse();
                if(this.patients){
                    this.totalPatient = this.patients.length;
                }
            } else {
                this.patients = [];
            }
        }, error => {
            console.log(error);
        });

        //Busqueda de presupuestos
        this._apiService.getBudgets().subscribe(response => {
            if (response.data) {
                const bud = response.data;
                this.budgets = bud.reverse();
                if(this.budgets){
                    this.totalBudgets = this.budgets.length;
                }                
            } else {
                this.budgets = [];
            }
        }, error => {
            console.log(error);
            this.budgets = [];
        });


        //Busqueda de citas
        this._apiService.getQuotes().subscribe(response => {
            if (response.data) {
                this.quotes = response.data;
                for (let i = 0; i < this.quotes.length; i++) {
                    var dateDay = new Date().toLocaleDateString();
                    if (new Date(this.quotes[i].startDay).toLocaleDateString() == dateDay){
                        if (!this.quotes[i].state){
                            this.quotesP.push(this.quotes[i]);
                        }                        
                    }                   
                }                
                if(this.quotesP){
                    this.totalQuotes = this.quotesP.length;
                }  
                //console.log('Quoites: ', this.quotes);
            } else {
                // this.patients = [];
            }
        }, error => {
            console.log(error);
        });
    }

    utcTime(): void {
        setInterval(() => {
            this.myDate = new Date();
        }, 1000);
    }
}
