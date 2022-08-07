import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailsComponent} from '../../../clinical-records/treatement/dialogs/details/details.component';
import {ApiService} from '../../../../../services/api.service';
import {Quotes} from '../../../../../models/quotes';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit {
    paymentFormGroup: FormGroup;
    quoteId: string;
    quote: Quotes = {
        _id: '1',
        startDay: null,
        endDay: null,
        patient: null,
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
        this.dialogRef.close();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    updateQuote() {
        if (this.paymentFormGroup.valid) {
            this._apiService.updateQuote(this.quote).subscribe(response => {
                if (response.success) {
                    this.openSnackBar('Abono agregado', 'Aceptar');
                    this.dialogRef.close();
                } else {
                    this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
            });
        }
    }
}
