import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-delete-treatment-budget',
    templateUrl: './delete-treatment-budget.component.html',
    styleUrls: ['./delete-treatment-budget.component.scss']
})
export class DeleteTreatmentBudgetComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DeleteTreatmentBudgetComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar) {
        dialogRef.disableClose = true;
    }

    ngOnInit() {
    }

    deleteTreatmentBudget() {
        this.dialogRef.close(true);
    }
}
