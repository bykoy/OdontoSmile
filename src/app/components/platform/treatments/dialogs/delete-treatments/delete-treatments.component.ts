import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-delete-treatments',
  templateUrl: './delete-treatments.component.html',
  styleUrls: ['./delete-treatments.component.scss']
})
export class DeleteTreatmentsComponent implements OnInit {

    _id = '';
    name = '';

    constructor(public dialogRef: MatDialogRef<DeleteTreatmentsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this._id = data._id;
        this.name = data.name;
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

    deleteTreatments() {
        this._apiService.deleteTreatments(this._id).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El tratamiento ha sido eliminado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido eliminar el tratamiento', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido eliminar el tratamiento', 'Aceptar');
        });
    }
}
