import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Budgets} from "../../../../models/budgets";
import {ApiService} from "../../../../services/api.service";
import {TreatmentsBudget} from "../../../../models/treatmentsBudget";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateTreatmentBudgetComponent} from "../dialogs/create-treatment-budget/create-treatment-budget.component";
import {PdfService} from "../../../../services/pdf.service";
import {DeleteTreatmentBudgetComponent} from "../dialogs/delete-treatment-budget/delete-treatment-budget.component";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
    isFrom = '';

    budgetId: string;
    budget: Budgets = {
        _id: '',
        patientRut: '',
        date: '',
        discount: 0,
        totalPrice: 0,
        treatments: [],
    };
    discounts = [
        {name: '0%', value: 0},
        {name: '10%', value: 0.1},
        {name: '20%', value: 0.2},
        {name: '30%', value: 0.3},
        {name: '40%', value: 0.4},
        {name: '50%', value: 0.5}
    ];

    // Identificadores de las columnas
    displayedColumns = ['treatment', 'price', 'firstTooth', 'actions'];
    dataSource;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                public snackBar: MatSnackBar,
                private dialog: MatDialog,
                private _apiService: ApiService,
                private _pdfService: PdfService) {
        this.budgetId = _route.snapshot.params.budgetId;
        this.isFrom = _route.snapshot.data.isFrom;
    }

    ngOnInit() {
        this._apiService.getBudget(this.budgetId).subscribe(response => {
            if (response.data) {
                this.budget = response.data;
            } else {
                this.openSnackBar('No se han podido cargar los datos del presupuesto', 'Aceptar');
            }
            this.dataSource = new MatTableDataSource<TreatmentsBudget>(this.budget.treatments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.dataSource = new MatTableDataSource<TreatmentsBudget>(this.budget.treatments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    addTreatment(): void {
        const dialogRef = this.dialog.open(CreateTreatmentBudgetComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                newBudget: true
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.budget.treatments.push(result);
                this.totalPrice();
                this.updateBudget();
            }
        });
    }

    removeTreatment(elementIndex) {
        const dialogRef = this.dialog.open(DeleteTreatmentBudgetComponent, {
            maxWidth: '650px',
            width: '98%'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = elementIndex + this.paginator.pageIndex * this.paginator.pageSize;
                this.budget.treatments.splice(index, 1);
                this.totalPrice();
                this.updateBudget();
            }
        });
    }

    totalPrice() {
        this.budget.totalPrice = 0;
        for (let i = 0; i < this.budget.treatments.length; i++) {
            this.budget.totalPrice = this.budget.totalPrice + this.budget.treatments[i].price;
        }
    }

    readyTreatment(value: boolean, elementIndex: number) {
        const index = elementIndex + this.paginator.pageIndex * this.paginator.pageSize;
        this.budget.treatments[index].ready = value;
        if (value) {
            this.budget.treatments[index].readyDate = new Date().toDateString();
        } else {
            this.budget.treatments[index].readyDate = '';
        }
        this.updateBudget();
    }

    updateBudget() {
        this._apiService.updateBudget(this.budget).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Presupuesto actualizado correctamente', 'Aceptar');
                this.ngOnInit();
            } else {
                this.openSnackBar('No se ha podido actualizar el presupuesto', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se ha podido actualizar el presupuesto', 'Aceptar');
        });
    }

    makePdf() {
        this._pdfService.budgetPDF(this.budget);
    }

}
