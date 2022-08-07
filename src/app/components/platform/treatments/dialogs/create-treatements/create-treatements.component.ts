import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Treatments} from '../../../../../models/treatments';

@Component({
    selector: 'app-create-treatements',
    templateUrl: './create-treatements.component.html',
    styleUrls: ['./create-treatements.component.scss']
})
export class CreateTreatementsComponent implements OnInit {

    treatmentsFormGroup: FormGroup;

    treatments: Treatments = {
        _id: '',
        name: '',
        price: ''
    };

    constructor(public dialogRef: MatDialogRef<CreateTreatementsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.treatmentsFormGroup = this._formBuilder.group({
            tratNameCtrl: ['', Validators.required],
            priceNameCtrl: ['', Validators.required]
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

    createTreatments() {
        if (this.treatmentsFormGroup.valid) {
            this._apiService.createTreatments(this.treatments).subscribe(response => {
                if (response.success) {
                    this.openSnackBar('El tratamiento ha sido registrado con éxito', 'Aceptar');
                    this.onNoClick();
                } else {
                    this.openSnackBar('No se ha podido registrar el tratamiento', 'Aceptar');
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se ha podido registrar el tratamiento', 'Aceptar');
            });
        } else {
            this.openSnackBar('Faltan datos requeridos', 'Aceptar');
        }
    }
}
