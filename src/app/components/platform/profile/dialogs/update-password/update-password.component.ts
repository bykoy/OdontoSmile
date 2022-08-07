import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
    passwordFormGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private _apiService: ApiService) {
        this.passwordFormGroup = this._formBuilder.group({
            lastPasswordCtrl: ['', Validators.required],
            password1Ctrl: ['', Validators.required],
            password2Ctrl: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3500
        });
    }

    updatePassword() {
        if (this.passwordFormGroup.valid) {
            if (this.passwordFormGroup.get('password1Ctrl').value === this.passwordFormGroup.get('password2Ctrl').value) {
                const password = {
                    lastPassword: this.passwordFormGroup.get('lastPasswordCtrl').value,
                    password1: this.passwordFormGroup.get('password1Ctrl').value,
                    password2: this.passwordFormGroup.get('password2Ctrl').value,
                };
                this._apiService.updatePassword(password).subscribe(response => {
                    if (response.success) {
                        this.openSnackBar('Contraseña actualizada con éxito', 'Aceptar');
                        this.dialogRef.close();
                    } else {
                        this.openSnackBar('No se ha podido actualizar la contraseña', 'Aceptar');
                    }
                }, error => {
                  console.log(error);
                  this.openSnackBar('No se ha podido actualizar la contraseña', 'Aceptar');
                });
            } else {
                this._snackBar.open('La nueva contraseña no coincide', 'Aceptar');
            }
        } else {
            this._snackBar.open('Campos requeridos por completar', 'Aceptar');
        }
    }

}
