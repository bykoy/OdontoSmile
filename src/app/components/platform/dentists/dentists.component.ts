import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../../services/api.service';
import {Dentists} from '../../../models/dentists';
import {CreateDentistComponent} from './dialogs/create-dentist/create-dentist.component';
import {DeleteDentistComponent} from './dialogs/delete-dentist/delete-dentist.component';
import {UpdateDentistComponent} from './dialogs/update-dentist/update-dentist.component';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.component.html',
  styleUrls: ['./dentists.component.scss']
})
export class DentistsComponent implements OnInit {

    // Identificadores de las columnas
    displayedColumns = ['rut', 'firstName', 'specialty', 'actions'];
    dataSource;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dentists: Dentists[];

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this._apiService.getDentists().subscribe(response => {
            if (response.data) {
                const pat = response.data;
                this.dentists = pat.reverse();
            } else {
                this.dentists = [];
            }
            this.dataSource = new MatTableDataSource<Dentists>(this.dentists);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.dentists = [];
            this.dataSource = new MatTableDataSource<Dentists>(this.dentists);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remueve los espacios
        filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
        this.dataSource.filter = filterValue;
    }

    openCreateDentist(): void {
        const dialogRef = this.dialog.open(CreateDentistComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Nuevo Dentista'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openUpdateDentist(id): void {
        const dialogRef = this.dialog.open(UpdateDentistComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar Dentista',
                rut: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openDeleteDentist(id): void {
        const dialogRef = this.dialog.open(DeleteDentistComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Dentista',
                rut: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

}
