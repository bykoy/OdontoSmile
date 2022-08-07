import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Treatments} from '../../../models/treatments';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {CreateTreatementsComponent} from './dialogs/create-treatements/create-treatements.component';
import {UpdateTreatmentsComponent} from './dialogs/update-treatments/update-treatments.component';
import {DeleteTreatmentsComponent} from './dialogs/delete-treatments/delete-treatments.component';
import { RoleGuard } from 'src/app/role.guard';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements OnInit {

   user = JSON.parse(localStorage.getItem('user'));

  // Identificadores de las columnas
  displayedColumns = ['name', 'price', 'actions'];
  dataSource;

  // Se inicializa el paginador y ordenamiento de tablas de Material
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  treatments: Treatments[];

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _apiService: ApiService,
              private dialog: MatDialog,
              private roleGuard: RoleGuard) {
    }

  ngOnInit() {
      this._apiService.getTreatments().subscribe(response => {
          if (response.data) {
              this.treatments = response.data;
          } else {
              this.treatments = [
                  {
                      _id: '1',
                      name: 'Exodoncia',
                      price: '20.000'
                  }
              ];
          }
          this.dataSource = new MatTableDataSource<Treatments>(this.treatments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }, error => {
          console.log(error);
          this.treatments = [
              {
                  _id: '1',
                  name: 'Exodoncia',
                  price: '20.000'
              }
          ];
          this.dataSource = new MatTableDataSource<Treatments>(this.treatments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remueve los espacios
      filterValue = filterValue.toLowerCase(); // Pasa los textos a minuscula
      this.dataSource.filter = filterValue;
  }

  newTreatments() {
      this.openCreateTreatments();
  }

  openCreateTreatments(): void {
      const dialogRef = this.dialog.open(CreateTreatementsComponent, {
          maxWidth: '650px',
          width: '98%',
          data: {
              title: 'Nuevo Tratamiento'
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          this.ngOnInit();
      });
  }

    openUpdateTreatments(_id): void {
        const dialogRef = this.dialog.open(UpdateTreatmentsComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Actualizar Tratamiento',
                _id: _id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    openDeleteTreatments(_id, name): void {
        const dialogRef = this.dialog.open(DeleteTreatmentsComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Tratamiento',
                _id: _id,
                name : name
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    hasRole(): boolean {
        const { scopes = [] } = { "scopes": this.user.role };
        if (this.roleGuard.roles == null) {
            return false;
        } else {
            if (this.roleGuard.roles.includes(scopes)) {
                return true;
            } else {
                return false;
            }
        }
    }

    /*hasRole(r: any): boolean {
        const { scopes = [] } = { "scopes": this.user.role };
        if (r == null) {
            return true;
        } else {
            if (r.includes(scopes)) {
                return true;
            } else {
                return false;
            }
        }
    }*/
}
