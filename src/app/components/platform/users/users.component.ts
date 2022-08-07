import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {User} from "../../../models/user";
import {UpdateTreatmentsComponent} from "../treatments/dialogs/update-treatments/update-treatments.component";
import {DeleteUserComponent} from "./dialogs/delete-user/delete-user.component";
import {CreateUserComponent} from "./dialogs/create-user/create-user.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    // Identificadores de las columnas
    displayedColumns = ['firstName', 'email', 'actions'];
    dataSource;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    users: User[] = [];

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this._apiService.getUsers().subscribe(response => {
            if (response.data) {
                this.users = response.data;
            }
            this.dataSource = new MatTableDataSource<User>(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.dataSource = new MatTableDataSource<User>(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remueve los espacios
        filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
        this.dataSource.filter = filterValue;
    }

    createUser() {
        const dialogRef = this.dialog.open(CreateUserComponent, {
            maxWidth: '650px',
            width: '98%'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    deleteUser(id: string) {
        const dialogRef = this.dialog.open(DeleteUserComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                id: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }
}
