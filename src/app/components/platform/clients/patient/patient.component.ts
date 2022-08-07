import {Component, OnInit, ViewChild} from '@angular/core';
import {UpdatePatientComponent} from '../dialogs/update-patient/update-patient.component';
import {ApiService} from '../../../../services/api.service';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Budgets} from '../../../../models/budgets';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteBudgetComponent} from '../../budgets/dialogs/delete-budget/delete-budget.component';
import {Patients} from '../../../../models/patients';
import {DeletePatientComponent} from '../dialogs/delete-patient/delete-patient.component';
import {PdfService} from '../../../../services/pdf.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    patientId;
    patient: Patients = {
        _id: '',
        rut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        birthdate: '',
        gender: '',
        dateOfBirth: null,
        background: {
            pregnancy: false,
            epilepsy: false,
            hypertension: false,
            diabetes: false,
            heartDisease: false,
            allergy: false,
            Onychophagia: false,
            swallowing: false,
            fingerSuction: false,
            others: ''
        }
    };

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
        this.patientId = _route.snapshot.params.id;
    }

    ngOnInit() {
        this._apiService.getPatient(this.patientId).subscribe(response => {
            if (response.data) {
                this.patient = response.data;
                this._apiService.getBudgetsByRut(this.patient.rut).subscribe(response2 => {
                    if (response2.data) {
                        this.budgets = response2.data;
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
            } else {
                this._router.navigate(['/platform/clients/']).then(responseRoute => {
                    console.log(responseRoute);
                });
            }
        }, error => {
            console.log(error);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remueve los espacios
        filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
        this.dataSource.filter = filterValue;
    }

    openUpdatePatient(rut): void {
        const dialogRef = this.dialog.open(UpdatePatientComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar Paciente',
                rut: rut
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openDeletePatient(rut): void {
        const dialogRef = this.dialog.open(DeletePatientComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Paciente',
                rut: rut
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openDeleteBudget(id): void {
        const dialogRef = this.dialog.open(DeleteBudgetComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Budget',
                _id: id
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
