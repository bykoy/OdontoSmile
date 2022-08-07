import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../../../services/api.service';

@Component({
    selector: 'app-delete-patient',
    templateUrl: './delete-patient.component.html',
    styleUrls: ['./delete-patient.component.scss']
})
export class DeletePatientComponent implements OnInit {

    rut = '';

    constructor(public dialogRef: MatDialogRef<DeletePatientComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.rut = data.rut;
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    deletePatient() {
        this._apiService.deletePatient(this.rut).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El paciente ha sido eliminado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido eliminar el paciente', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido eliminar el paciente', 'Aceptar');
        });
    }
}
