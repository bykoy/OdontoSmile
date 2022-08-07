import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-delete-dentist',
  templateUrl: './delete-dentist.component.html',
  styleUrls: ['./delete-dentist.component.scss']
})
export class DeleteDentistComponent implements OnInit {

    rut = '';

    constructor(public dialogRef: MatDialogRef<DeleteDentistComponent>,
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

    deleteDentist() {
        this._apiService.deleteDentist(this.rut).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El dentista ha sido eliminado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido eliminar el dentista', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido eliminar el dentista', 'Aceptar');
        });
    }

}
