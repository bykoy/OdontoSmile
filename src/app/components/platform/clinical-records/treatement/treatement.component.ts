import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PdfService} from '../../../../services/pdf.service';
import {ApiService} from '../../../../services/api.service';
import {Budgets} from '../../../../models/budgets';
import {TreatmentsBudget} from '../../../../models/treatmentsBudget';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailsComponent} from './dialogs/details/details.component';

@Component({
  selector: 'app-treatement',
  templateUrl: './treatement.component.html',
  styleUrls: ['./treatement.component.scss']
})
export class TreatementComponent implements OnInit {

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

    // Identificadores de las columnas
    displayedColumns = ['treatment', 'firstTooth', 'readyDate', 'actions'];
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

    openUpdateDetail(_idB, _idT): void {
        const dialogRef = this.dialog.open(DetailsComponent, {
            maxWidth: '650px',
            maxHeight: '390px',
            width: '98%',
            height: '98%',
            data: {
                title: 'Detalle del trataminto',
                _idB: _idB,
                _idT: _idT
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
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
