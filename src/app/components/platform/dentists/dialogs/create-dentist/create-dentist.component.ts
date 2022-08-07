import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Dentists} from '../../../../../models/dentists';

@Component({
  selector: 'app-create-dentist',
  templateUrl: './create-dentist.component.html',
  styleUrls: ['./create-dentist.component.scss']
})
export class CreateDentistComponent implements OnInit {

    dentistFormGroup: FormGroup;

    dentist: Dentists = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: 'Carahue',
        country: 'Chile',
        specialty: '',
    };

    constructor(public dialogRef: MatDialogRef<CreateDentistComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
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
            specialtyCtrl: ['', Validators.required]
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

    createDentist() {
        this._apiService.createDentist(this.dentist).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El dentista ha sido registrado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido registrar al dentista', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido registrar al dentista', 'Aceptar');
        });
    }
}
