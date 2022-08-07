import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from '../../../../../models/user';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    userFormGroup: FormGroup;

    rutUser: '';

    user: User = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: 'Carahue',
        country: 'Chile',
        gender: '',
        dateOfBirth: null,
        role: null
    };

    constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                private snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.userFormGroup = _formBuilder.group({
            rutCtrl: ['', Validators.required],
            firstNameCtrl: ['', Validators.required],
            lastNameCtrl: ['', Validators.required],
            genderCtrl: ['', Validators.required],
            dateOfBirthCtrl: ['', Validators.required],
            phoneCtrl: [''],
            emailCtrl: ['', Validators.required],
            addressCtrl: ['', Validators.required],
            cityCtrl: ['', Validators.required],
            countryCtrl: ['', Validators.required],
            password1Ctrl: ['', Validators.required],
            password2Ctrl: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    createUser() {
        if (this.userFormGroup.valid) {
            const user = {
                rut: this.userFormGroup.get('rutCtrl').value,
                first_name: this.userFormGroup.get('firstNameCtrl').value,
                last_name: this.userFormGroup.get('lastNameCtrl').value,
                gender: this.userFormGroup.get('genderCtrl').value,
                dateOfBirth: this.userFormGroup.get('dateOfBirthCtrl').value,
                phone: this.userFormGroup.get('phoneCtrl').value,
                email: this.userFormGroup.get('emailCtrl').value,
                address: this.userFormGroup.get('addressCtrl').value,
                city: this.userFormGroup.get('cityCtrl').value,
                country: this.userFormGroup.get('countryCtrl').value,
                password: this.userFormGroup.get('password1Ctrl').value,                
                password_2: this.userFormGroup.get('password2Ctrl').value,
                role: "Admin"
            };
            //console.log(user);
            this._apiService.createUser(user).subscribe(response => {
                if (response.success && response.data) {
                    this.openSnackBar('Usuario registrado con éxito', 'Aceptar');
                    this.dialogRef.close(true);
                } else {
                    this.openSnackBar('No se ha podido registrar el usuario', 'Aceptar');
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se ha podido registrar el usuario', 'Aceptar');
            });
        }
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
        this.rutUser = rut;
    }

}
