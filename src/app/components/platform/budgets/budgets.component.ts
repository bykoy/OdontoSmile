import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Budgets} from '../../../models/budgets';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {DeleteBudgetComponent} from './dialogs/delete-budget/delete-budget.component';
import {PdfService} from '../../../services/pdf.service';

@Component({
    selector: 'app-budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

    // Identificadores de las columnas
    displayedColumns = ['patientRut', 'date', 'totalPrice', 'actions'];
    dataSource;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    budgets: Budgets[];

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                private _pdfService: PdfService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this._apiService.getBudgets().subscribe(response => {
            if (response.data) {
                const bud = response.data;
                this.budgets = bud.reverse();
            } else {
                this.budgets = [];
            }
            this.dataSource = new MatTableDataSource<Budgets>(this.budgets);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.budgets = [];
            this.dataSource = new MatTableDataSource<Budgets>(this.budgets);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remueve los espacios
        filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
        this.dataSource.filter = filterValue;
    }

    openDeleteBudget(_id): void {
        const dialogRef = this.dialog.open(DeleteBudgetComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Budget',
                _id: _id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    makePDF(budget: Budgets): void {
        this._pdfService.budgetPDF(budget);
    }

    isReady(elementIndex) {
        const index = elementIndex + this.paginator.pageIndex * this.paginator.pageSize;
        for (let i = 0; i < this.budgets[index].treatments.length; i++) {
            if (!this.budgets[index].treatments[i].ready) {
                return false;
            }
        }
        return true;
    }

}
