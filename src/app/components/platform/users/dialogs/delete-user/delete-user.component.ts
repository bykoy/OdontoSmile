import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteTreatmentsComponent} from "../../../treatments/dialogs/delete-treatments/delete-treatments.component";

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
    id = '';

    constructor(public dialogRef: MatDialogRef<DeleteTreatmentsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this.id = data.id;
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    deleteUser() {
        this._apiService.deleteUser(this.id).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El usuario ha sido removido con éxito', 'Aceptar');
                this.dialogRef.close(true);
            } else {
                this.openSnackBar('No se ha podido remover el usuario', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido remover el usuario', 'Aceptar');
        });
    }

}
