import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Quotes} from '../../../../../models/quotes';
import {Patients} from '../../../../../models/patients';
import {PatientsQuotes} from '../../../../../models/patientsQuotes';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Dentists} from '../../../../../models/dentists';

@Component({
  selector: 'app-create-quotes',
  templateUrl: './create-quotes.component.html',
  styleUrls: ['./create-quotes.component.scss']
})
export class CreateQuotesComponent implements OnInit {
    date = new FormControl(new Date());

    myControl = new FormControl();
    filteredPatients: Observable<Patients[]>;

    quoteFormGroup: FormGroup;

    patient: String;
    patients: Patients[];

    quote: Quotes = {
        startDay: null,
        endDay: null,
        patient: null,
        description: '',
        state: false,
        payment: 0,
        rut_dentists: ''
    };

    pat: Patients = {
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        birthdate: '',
        gender: '',
        dateOfBirth: null,
        background: {
            pregnancy: false,
            epilepsy: false,
            hypertension: false,
            diabetes: false,
            heartDisease: false,
            allergy: false,
            Onychophagia: false,
            swallowing: false,
            fingerSuction: false,
            others: ''
        }
    };

    pat2: Patients = {
        rut: '',
        firstName: null,
        lastName: null,
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        birthdate: '',
        gender: '',
        dateOfBirth: null,
        background: {
            pregnancy: false,
            epilepsy: false,
            hypertension: false,
            diabetes: false,
            heartDisease: false,
            allergy: false,
            Onychophagia: false,
            swallowing: false,
            fingerSuction: false,
            others: ''
        }
    };

    newPat: PatientsQuotes = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    };

    dentist: Dentists;
    dentists: Dentists[];

    constructor(public dialogRef: MatDialogRef<CreateQuotesComponent>,
                @Inject(MAT_DIALOG_DATA) 
                public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;

        if(this.data.dateI == null){
            var dateHoy = new Date();

            this.quote.startDay = dateHoy;
            this.quote.endDay = dateHoy;
        }else{
            this.quote.startDay = this.data.dateI;
            //this.quote.endDay = this.data.dateI;

            var currentDateObj = this.data.dateI;
            var numberOfMlSeconds = currentDateObj.getTime();
            var addMlSeconds = 15 * 60000;
            this.quote.endDay = new Date(numberOfMlSeconds + addMlSeconds);
        }
        
        this._apiService.getDentists().subscribe(response => {
            if (response.data) {
                this.dentists = response.data;
            } else {
                this.dentists = [];
            }
        }, error => {
            console.log(error);
            this.dentists = [];
        });
    }

    ngOnInit() {
        //console.log(this.date);
        this._apiService.getPatients().subscribe(response => {
            if (response.data) {
                const pat = response.data;
                this.patients = pat.reverse();
            } else {
                this.patients = [];
            }
        }, error => {
            console.log(error);
            this.patients = [];
        });

        this.filteredPatients = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this.quoteFormGroup = this._formBuilder.group({
            quoDescCtrl: ['', Validators.required],
            dentistCtrl: ['', Validators.required],
            startCtrl: ['', Validators.required],
            evdCtrl: ['', Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    createQuotes() {
        if (this.quoteFormGroup.valid) {
            this._apiService.getPatientByRut(this.patient).subscribe(response => {
                if (response.data) {
                    this.pat = response.data;
                    //
                    this.newPat.firstName = this.pat.firstName;
                    this.newPat.lastName = this.pat.lastName;
                    this.newPat.rut = this.pat.rut;
                    this.newPat.email = this.pat.email;
                    this.newPat.phone = this.pat.phone;
                    //
                    this.quote.patient = this.newPat;

                    this.quote.rut_dentists = this.dentist.rut;
                    console.log(this.quote);
                    this._apiService.createQuote(this.quote).subscribe(respon => {
                        if (respon.success) {
                            this.openSnackBar('La cita ha sido registrado con éxito', 'Aceptar');
                            this.onNoClick();
                        } else {
                            this.openSnackBar('No se ha podido registrar la cita', 'Aceptar');
                        }
                    }, error => {
                        console.log(error);
                        this.openSnackBar('No se ha podido registrar la cita', 'Aceptar');
                    });
                } else {
                    console.log('error');
                }
            }, error => {
                console.log(error);
            });
        } else {
            this.openSnackBar('Faltan datos requeridos', 'Aceptar');
        }
    }

    private _filter(name: string): Patients[] {
        const filterValue = name.toLowerCase();
        return this.patients ? this.patients.filter(patient => patient.rut.toLowerCase().indexOf(filterValue) === 0) : [];
    }

    findPatient() {
        this._apiService.getPatientByRut(this.patient).subscribe(response => {
            if (response.data) {
                this.pat2 = response.data;
                //console.log(this.pat2);
            } else {
                console.log('error');
            }
        }, error => {
            console.log(error);
        });
    }
}
