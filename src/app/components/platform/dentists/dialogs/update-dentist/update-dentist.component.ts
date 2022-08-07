import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Dentists} from '../../../../../models/dentists';

@Component({
  selector: 'app-update-dentist',
  templateUrl: './update-dentist.component.html',
  styleUrls: ['./update-dentist.component.scss']
})
export class UpdateDentistComponent implements OnInit {

    dentistFormGroup: FormGroup;

    dentist: Dentists = {
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

    constructor(public dialogRef: MatDialogRef<UpdateDentistComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this._apiService.getDentist(data.rut).subscribe(response => {
            if (response.data) {
                this.dentist = response.data;
            } else {
                this.openSnackBar('No se han cargado los datos del dentista', 'Aceptar');
                this.onNoClick();
            }
        }, error => {
            console.log(error);
        });
    }

    ngOnInit() {
        this.dentistFormGroup = this._formBuilder.group({
            rutCtrl: ['', Validators.required],
            firstNameCtrl: ['', Validators.required],
            lastNameCtrl: ['', Validators.required],
            phoneCtrl: [''],
            emailCtrl: [''],
            addressCtrl: ['', Validators.required],
            cityCtrl: ['', Validators.required],
            countryCtrl: ['', Validators.required],
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

    updateDentist() {
        this._apiService.updateDentist(this.dentist).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Los datos del dentista han sido actualizado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se han podido actualizar los datos del dentista', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se han podido actualizar los datos del dentista', 'Aceptar');
        });
    }

}
