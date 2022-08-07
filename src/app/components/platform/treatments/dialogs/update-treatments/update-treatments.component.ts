import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Treatments} from '../../../../../models/treatments';
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-update-treatments',
  templateUrl: './update-treatments.component.html',
  styleUrls: ['./update-treatments.component.scss']
})
export class UpdateTreatmentsComponent implements OnInit {

    treatmentsFormGroup: FormGroup;

    treatment: Treatments = {
        _id: '',
        name: '',
        price: ''
    };

    constructor(public dialogRef: MatDialogRef<UpdateTreatmentsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this._apiService.getTreatment(data._id).subscribe(response => {
            if (response.data) {
                this.treatment = response.data;
            } else {
                this.openSnackBar('No se han podido cargado los datos del tratamiento', 'Aceptar');
                this.onNoClick();
            }
        }, error => {
            console.log(error);
        });
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

    updateTreatments() {
        this._apiService.updateTreatments(this.treatment).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Los datos del tratamiento han sido actualizado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se han podido actualizar los datos del tratamiento', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se han podido actualizar los datos del tratamiento', 'Aceptar');
        });
    }

}
