import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Patients} from '../../../models/patients';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {CreatePatientComponent} from './dialogs/create-patient/create-patient.component';
import {UpdatePatientComponent} from './dialogs/update-patient/update-patient.component';
import {DeletePatientComponent} from './dialogs/delete-patient/delete-patient.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    // Identificadores de las columnas
    displayedColumns = ['rut', 'firstName', 'phone', 'actions'];
    dataSource;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    patients: Patients[];

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this._apiService.getPatients().subscribe(response => {
            if (response.data) {
                const pat = response.data;
                this.patients = pat.reverse();
            } else {
                this.patients = [];
            }
            this.dataSource = new MatTableDataSource<Patients>(this.patients);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.patients = [];
            this.dataSource = new MatTableDataSource<Patients>(this.patients);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remueve los espacios
        filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
        this.dataSource.filter = filterValue;
    }

    /*openPatient(id): void {
        this._router.navigate(['/platform/clients/' + id]).then(response => {
            console.log(response);
        });
    }*/

    openClinicalRecords(id): void {
        this._router.navigate(['/platform/clients/' + id + '/clinical-records']).then(response => {
            console.log(response);
        });
    }

    openCreatePatient(): void {
        const dialogRef = this.dialog.open(CreatePatientComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Nuevo Paciente'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openUpdatePatient(id): void {
        const dialogRef = this.dialog.open(UpdatePatientComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar Paciente',
                rut: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openDeletePatient(id): void {
        const dialogRef = this.dialog.open(DeletePatientComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Paciente',
                rut: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

}
