import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Patients} from '../../../../../models/patients';

@Component({
    selector: 'app-update-patient',
    templateUrl: './update-patient.component.html',
    styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

    patientFormGroup: FormGroup;
    patient: Patients = {
        _id: '',
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

    constructor(public dialogRef: MatDialogRef<UpdatePatientComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this._apiService.getPatient(data.rut).subscribe(response => {
            if (response.data) {
                this.patient = response.data;
                if (this.patient.background == null){
                    //console.log("Datos paciente1: ", this.patient);
                    var backg = {
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
                    };
                    this.patient.background = backg;
                }
                //console.log("Datos paciente2: ", this.patient);
            } else {
                this.openSnackBar('No se han cargado los datos del paciente', 'Aceptar');
                this.onNoClick();
            }
        }, error => {
            console.log(error);
        });
    }

    ngOnInit() {
        this.patientFormGroup = this._formBuilder.group({
            rutCtrl: ['', Validators.required],
            firstNameCtrl: ['', Validators.required],
            lastNameCtrl: ['', Validators.required],
            genderCtrl: ['', Validators.required],
            dateOfBirthCtrl: ['', Validators.required],
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

    updatePatient() {
        this._apiService.updatePatient(this.patient).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Los datos del paciente han sido actualizado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se han podido actualizar los datos del paciente', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se han podido actualizar los datos del paciente', 'Aceptar');
        });
    }

}
