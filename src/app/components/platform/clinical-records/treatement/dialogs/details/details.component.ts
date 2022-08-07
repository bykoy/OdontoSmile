import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {Treatments} from '../../../../../../models/treatments';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../../services/api.service';
import {Budgets} from '../../../../../../models/budgets';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    detailFormGroup: FormGroup;

    position = 0;
    treatementId: string;
    budgetId: string;
    budget: Budgets = {
        _id: '',
        patientRut: '',
        date: '',
        discount: 0,
        totalPrice: 0,
        treatments: [{
            name: '',
            price: 0,
            ready: false,
            readyDate: '',
            tooth: {
                firstValue: 0,
                secondValue: 0
            },
            details: {
                detail: '',
                detailDate: ''
            }
        }],
    };

    constructor(public dialogRef: MatDialogRef<DetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.budgetId = data._idB;
        this.treatementId = data._idT;
    }

    ngOnInit() {
        this._apiService.getBudget(this.budgetId).subscribe(response => {
            if (response.data) {
                this.budget = response.data;
                for (let i = 0; i < this.budget.treatments.length; i++) {
                    if (this.budget.treatments[i]._id === this.treatementId) {
                        this.position = i;
                        console.log(this.position);
                    }
                }
            } else {
                this.openSnackBar('No se han podido cargar los datos del presupuesto', 'Aceptar');
            }
        }, error => {
            console.log(error);
        });

        this.detailFormGroup = this._formBuilder.group({
            detailCtrl: ['', Validators.required]
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

    updateBudget() {
        this._apiService.updateBudget(this.budget).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Presupuesto actualizado correctamente', 'Aceptar');
                this.ngOnInit();
            } else {
                this.openSnackBar('No se ha podido actualizar el presupuesto', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido actualizar el presupuesto', 'Aceptar');
        });
    }
}
