import {Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Patients} from '../../../models/patients';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../../services/api.service';
import {Budgets} from '../../../models/budgets';
import {UpdatePatientComponent} from '../clients/dialogs/update-patient/update-patient.component';
import {DeletePatientComponent} from '../clients/dialogs/delete-patient/delete-patient.component';
import {PdfService} from '../../../services/pdf.service';
import {DeleteBudgetComponent} from '../budgets/dialogs/delete-budget/delete-budget.component';
import {Quotes} from '../../../models/quotes';
import {PatientsQuotes} from '../../../models/patientsQuotes';

export interface Disease {
    name: string;
}

@Component({
  selector: 'app-clinical-records',
  templateUrl: './clinical-records.component.html',
  styleUrls: ['./clinical-records.component.scss']
})
export class ClinicalRecordsComponent implements OnInit {

    // Variables para ingreso de otras enfermedades por medio de Chips0
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
    other: string;
    diseases: Disease[] = [];
    //////////////////////////////////////////////////////////////////

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

    patQuo: PatientsQuotes;

    // patient.background.others.name

    budgets: Budgets[];
    quotes: Quotes[];
    allQuotesP: Array<Quotes> = [];
    quotesP: Array<Quotes> = [];

    qPatNum = 0;
    qPatPor = 0;
    qPorscentage = '';

    // Identificadores de las columnas
    displayedColumns = ['state', 'date', 'totalPrice', 'actions'];
    displayedColumns2 = ['patientRut', 'date', 'totalPrice', 'actions'];
    displayedColumns3 = ['date', 'payment', 'totalPrice', ''];
    displayedColumns4 = ['state', 'date', 'hour', 'description', 'payment', 'dentist'];
    dataSource;
    dataSource1;

    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                public snackBar: MatSnackBar,
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

              //Busqueda de citas por paciente
              this._apiService.getQuotes().subscribe(response => {
                  if (response.data) {
                      this.quotes = response.data;
                      //console.log('Quoites1: ', this.quotes);
                      for (let i = 0; i < this.quotes.length; i++) {
                          if (this.quotes[i].patient.rut == this.patient.rut) {
                            this.allQuotesP.push(this.quotes[i]);
                            
                            //Verificar si el paciente no asistió a citas anteriores a la fecha actual
                              var dateDay = new Date();
                              if (new Date(this.quotes[i].startDay) <= dateDay){
                              //this.quotesP[this.qPatNum] = this.quotes[i];
                                  this.quotesP.push(this.quotes[i]);
                                  this.qPatNum++;
                                  if (this.quotes[i].state) {
                                      this.qPatPor++;
                                  }
                              }
                          }
                      }
                      //console.log('Quoites: ', this.allQuotesP);
                      //console.log('Cantidad de citas: ', this.qPatNum);
                      //console.log('Cantidad de citas asistidas: ', this.qPatPor);

                      //Calculo porcentaje de asistencia del paciente
                      var auxi = this.qPatPor * 100 / this.qPatNum;
                      this.qPorscentage = auxi.toFixed(1);
                      this.dataSource1 = new MatTableDataSource<Quotes>(this.allQuotesP);
                      this.dataSource1.paginator = this.paginator;
                      this.dataSource1.sort = this.sort;
                  } else {
                      // this.patients = [];
                  }
              }, error => {
                  console.log(error);
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

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
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

    updatePatient() {
        console.log(this.patient);
        this._apiService.updatePatient(this.patient).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Los datos del paciente han sido actualizado con éxito', 'Aceptar');
            } else {
                this.openSnackBar('No se han podido actualizar los datos del paciente', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se han podido actualizar los datos del paciente', 'Aceptar');
        });
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

    openCreateBudget(): void {
        this._router.navigate(['/platform/budgets/create']).then(response => {
            console.log(response);
        });
    }

    makePDF(budget: Budgets): void {
        this._pdfService.budgetPDF(budget);
    }

    // Método para gregar chip a la lista de enfermedades adicionales
    /*add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our disease
        if ((value || '').trim()) {
            this.patient.background.others.push(this.other);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    //Método para remover chip a la lista de enfermedades adicionales
    remove(aux: string): void {
        const index = this.patient.background.others.indexOf(aux);
        if (index >= 0) {
            this.patient.background.others.splice(index, 1);
        }
    }*/

}
