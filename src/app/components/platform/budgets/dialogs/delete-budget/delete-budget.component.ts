import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-delete-budgets',
  templateUrl: './delete-budget.component.html',
  styleUrls: ['./delete-budget.component.scss']
})
export class DeleteBudgetComponent implements OnInit {

    _id = '';

    constructor(public dialogRef: MatDialogRef<DeleteBudgetComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
        dialogRef.disableClose = true;
        this._id = data._id;
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

    deleteBudget() {
        this._apiService.deleteBudget(this._id).subscribe(response => {
            if (response.success) {
                this.openSnackBar('El presupuesto ha sido eliminado con éxito', 'Aceptar');
                this.onNoClick();
            } else {
                this.openSnackBar('No se ha podido eliminar el presupuesto', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido eliminar el presupuesto', 'Aceptar');
        });
    }

}
