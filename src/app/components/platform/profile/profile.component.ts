import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../models/user";
import {UpdateContactInformationComponent} from "./dialogs/update-contact-information/update-contact-information.component";
import {UpdatePasswordComponent} from "./dialogs/update-password/update-password.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User = {
        rut: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        role: null,
        gender: '',
        dateOfBirth: null
    };

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _snackBar: MatSnackBar,
                private _apiService: ApiService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this._apiService.info().subscribe(response => {
            if (response.success && response.data) {
                this.user = response.data;
            } else {
                this.openSnackBar('No se ha podido obtener la información del usuario', 'aceptar');
                this._apiService.logout();
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido obtener la información del usuario', 'aceptar');
            this._apiService.logout();
        });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3500
        });
    }

    updateContactInformation() {
        const dialogRef = this.dialog.open(UpdateContactInformationComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar datos de contacto',
                _id: this.user._id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    updatePassword() {
        const dialogRef = this.dialog.open(UpdatePasswordComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar Contraseña',
                _id: this.user._id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

}
