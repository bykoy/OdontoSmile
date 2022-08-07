import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../services/api.service';
import {Patients} from '../../../../../models/patients';
import {UploadService} from '../../../../../services/upload.service';

@Component({
    selector: 'app-create-patient',
    templateUrl: './create-patient.component.html',
    styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {

    imgFile: File[];
    patientFormGroup: FormGroup;

    patient: Patients = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: 'Carahue',
        country: 'Chile',
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

    constructor(public dialogRef: MatDialogRef<CreatePatientComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private _apiService: ApiService,
                private _uploadService: UploadService) {
        dialogRef.disableClose = true;
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

    createPatient() {
        this._apiService.createPatient(this.patient).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El paciente ha sido registrado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido registrar al paciente', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido registrar al paciente', 'Aceptar');
        });
    }

    checkRut(rut) {
        // Despejar Puntos
        let re = /\./gi;
        let valor = rut.replace(re, '');
        // Despejar Guión
        valor = valor.replace('-', '');
        // Aislar Cuerpo y Dígito Verificador
        const cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();
        const d1 = valor.slice(0, -7);
        const d2 = valor.slice(d1.length, -4);
        const d3 = valor.slice(d1.length + d2.length, -1);

        // Formatear RUN
        //rut = cuerpo + '-' + dv;
        rut = d1 + '.' + d2 + '.' + d3 + '-' + dv;

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if (cuerpo.length < 7) {
            //rut.setCustomValidity('RUT Incompleto');
            return false;
        }

        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;

        // Para cada dígito del Cuerpo
        for ( let i = 1 ; i <= cuerpo.length ; i++) {

            // Obtener su Producto con el Múltiplo Correspondiente
            const index = multiplo * valor.charAt(cuerpo.length - i);

            // Sumar al Contador General
            suma = suma + index;

            // Consolidar Múltiplo dentro del rango [2,7]
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

        }

        // Calcular Dígito Verificador en base al Módulo 11
        const dvEsperado = 11 - (suma % 11);

        // Casos Especiales (0 y K)
        dv = (dv == 'K') ? 10 : dv;
        dv = (dv == 0) ? 11 : dv;

        // Validar que el Cuerpo coincide con su Dígito Verificador
        if (dvEsperado != dv) {
            //rut.setCustomValidity('RUT Inválido');
            return false;
        }

        // Si todo sale bien, eliminar errores (decretar que es válido)
        //rut.setCustomValidity('');
        this.patient.rut = rut;
    }

    subirImg() {
        let formData = new FormData();
        for ( let i = 0; i < this.imgFile.length; i++) {
            formData.append('uploads[]', this.imgFile[i], this.imgFile[i].name);
        }
        this._uploadService.uploadFile(formData).subscribe((res) => {
            console.log('response received is ', res);
        });
    }

    onFileChange(event) {
        this.imgFile = event.target.files;
    }
}
