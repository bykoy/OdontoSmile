import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Treatments} from '../../../../../models/treatments';
import {TreatmentsBudget} from '../../../../../models/treatmentsBudget';

@Component({
    selector: 'app-create-treatment-budget',
    templateUrl: './create-treatment-budget.component.html',
    styleUrls: ['./create-treatment-budget.component.scss']
})
export class CreateTreatmentBudgetComponent implements OnInit {
    treatmentFormGroup: FormGroup;
    newTreatment: TreatmentsBudget = {
        name: '',
        price: 0,
        ready: false,
        tooth: {
            firstValue: 0,
            secondValue: 0
        },
        details: {
            detail: '',
            detailDate: ''
        }
    };
    treatments: Treatments[];

    constructor(public dialogRef: MatDialogRef<CreateTreatmentBudgetComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                private snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.treatmentFormGroup = _formBuilder.group({
            treatmentCtrl: ['', Validators.required],
            toothFirstCtrl: [0],
            toothSecondCtrl: [0],
            otherPriceCtrl: [0]
        });
        this.treatmentFormGroup.patchValue({
            toothFirstCtrl: 0,
            toothSecondCtrl: 0
        });
        this._apiService.getTreatments().subscribe(response => {
            if (response.data) {
                this.treatments = response.data;
            } else {
                this.treatments = [];
            }
        }, error => {
            console.log(error);
            this.treatments = [];
        });
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    createTreatment() {
        if (this.treatmentFormGroup.valid && this.treatmentFormGroup.get('treatmentCtrl').value.name !== '') {
            const newTreatment: TreatmentsBudget = {
                name: this.treatmentFormGroup.get('treatmentCtrl').value.name,
                price: this.newTreatment.price,
                ready: false,
                tooth: {
                    firstValue: this.treatmentFormGroup.get('toothFirstCtrl').value,
                    secondValue: this.treatmentFormGroup.get('toothSecondCtrl').value
                },
                details: {
                    detail: '',
                    detailDate: ''
                }
            };
            if (this.treatmentFormGroup.get('otherPriceCtrl').value !== '' &&
                this.treatmentFormGroup.get('otherPriceCtrl').value !== 0) {
                newTreatment.price = this.treatmentFormGroup.get('otherPriceCtrl').value;
                this.dialogRef.close(newTreatment);
            } else {
                this.dialogRef.close(newTreatment);
            }
        } else {
            this.openSnackBar('No se ha podido añadir el tratamiento', 'Aceptar');
        }
    }
}
