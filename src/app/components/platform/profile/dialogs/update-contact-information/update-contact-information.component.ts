import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../../../../../services/api.service";
import {UpdateTreatmentsComponent} from "../../../treatments/dialogs/update-treatments/update-treatments.component";

@Component({
    selector: 'app-update-contact-information',
    templateUrl: './update-contact-information.component.html',
    styleUrls: ['./update-contact-information.component.scss']
})
export class UpdateContactInformationComponent implements OnInit {
    contactInformationFormGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<UpdateTreatmentsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private _apiService: ApiService) {
        this.contactInformationFormGroup = this._formBuilder.group({
            phoneCtrl: ['', Validators.required],
            addressCtrl: ['', Validators.required],
            cityCtrl: ['', Validators.required],
            countryCtrl: ['', Validators.required]
        });
        this._apiService.info().subscribe(response => {
            if (response.success && response.data) {
                this.contactInformationFormGroup.patchValue({
                    phoneCtrl: response.data.phone,
                    addressCtrl: response.data.address,
                    cityCtrl: response.data.city,
                    countryCtrl: response.data.country
                });
            } else {
                this.openSnackBar('No se ha reconocido la sesión', 'Aceptar');
                this._apiService.logout();
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha reconocido la sesión', 'Aceptar');
            this._apiService.logout();

        });
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3500
        });
    }

    updateContactInformation() {
        if (this.contactInformationFormGroup.valid) {
            const contactInformation = {
                phone: this.contactInformationFormGroup.get('phoneCtrl').value,
                address: this.contactInformationFormGroup.get('addressCtrl').value,
                city: this.contactInformationFormGroup.get('cityCtrl').value,
                country: this.contactInformationFormGroup.get('countryCtrl').value
            };
            this._apiService.updateContactInformation(contactInformation).subscribe(response => {
                if (response.success) {
                    this.openSnackBar('Información de contacto actualizada', 'Aceptar');
                    this.dialogRef.close(true);
                } else {
                    this.openSnackBar('No se ha podido actualizar la información', 'Aceptar');
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se ha podido actualizar la información', 'Aceptar');
            });
        } else {
            this.openSnackBar('Faltan campos por completar', 'Aceptar');
        }
    }

}
