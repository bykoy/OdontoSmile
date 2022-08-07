import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePaymentComponent} from '../dialogs/update-payment/update-payment.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../../services/api.service';
import {Quotes} from '../../../../models/quotes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PatientsQuotes} from '../../../../models/patientsQuotes';
import {Dentists} from '../../../../models/dentists';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    paymentFormGroup: FormGroup;
    quoteId: string;
    dentQuo: Dentists = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        specialty: ''
    };
    pat: PatientsQuotes = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    };
    quote: Quotes = {
        _id: '1',
        startDay: null,
        endDay: null,
        patient: this.pat,
        description: '',
        state: false,
        payment: 0,
        rut_dentists: ''
    };

    constructor(public dialogRef: MatDialogRef<UpdatePaymentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.quoteId = data._idB;
    }

    ngOnInit() {
        this._apiService.getQuote(this.quoteId).subscribe(response => {
            if (response.data) {
                this.quote = response.data;
                    //console.log(this.quote);
                this._apiService.getDentistByRut(this.quote.rut_dentists).subscribe(response => {
                    if (response.data) {
                        this.dentQuo = response.data;
                    } else {
                        console.log('error');
                    }
                }, error => {
                    console.log(error);
                });

            } else {
                this.openSnackBar('No se han podido cargar los datos del presupuesto', 'Aceptar');
            }
        }, error => {
            console.log(error);
        });

        this.paymentFormGroup = this._formBuilder.group({
            paymentCtrl: ['', Validators.required]
        });
    }

    onNoClick(): void {
        window.location.reload();
        this.dialogRef.close();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }
    //////////////////////////////////////////////////
    // Revisar si el paciente aistió o no
    readyQuotes(value: boolean) {
        this.quote.state = value;
        this._apiService.updateQuote(this.quote).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Cita actualizada', 'Aceptar');
                this.ngOnInit();
            } else {
                this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
        });
    }
}
