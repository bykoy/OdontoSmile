import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {TreatmentsBudget} from "../../../../models/treatmentsBudget";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Budgets} from "../../../../models/budgets";
import {Patients} from "../../../../models/patients";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CreateTreatmentBudgetComponent} from "../dialogs/create-treatment-budget/create-treatment-budget.component";
import {PdfService} from "../../../../services/pdf.service";
import {DeleteTreatmentBudgetComponent} from "../dialogs/delete-treatment-budget/delete-treatment-budget.component";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-create-budget',
    templateUrl: './create-budget.component.html',
    styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent implements OnInit {
    budgetFormGroup: FormGroup;

    patien: String;
    patients: Patients[];
    myControl = new FormControl();
    filteredPatients: Observable<Patients[]>;
    pat2: Patients = {
        rut: '',
        firstName: null,
        lastName: null,
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

    isFrom = '';
    patientId;
    patient: Patients = {
        rut: '',
        firstName: '',
        lastName: '',
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
                private _formBuilder: FormBuilder,
                private dialog: MatDialog,
                private _apiService: ApiService,
                private _pdfService: PdfService) {
        this.budgetFormGroup = this._formBuilder.group({
            patientRutCtrl: ['', Validators.required],
            discountCtrl: ['']
        });
        this.isFrom = _route.snapshot.data.isFrom;
        if (this.isFrom === 'patient') {
            this.patientId = _route.snapshot.params.id;
            _apiService.getPatient(this.patientId).subscribe(response => {
                if (response.data) {
                    this.patient = response.data
                } else {
                    this.openSnackBar('No se ha encontrado el paciente', 'Aceptar');
                    _router.navigate(['../'], {relativeTo: _route}).then();
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se ha encontrado el paciente', 'Aceptar');
                _router.navigate(['../'], {relativeTo: _route}).then();
            });
        }
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<TreatmentsBudget>(this.budget.treatments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this._apiService.getPatients().subscribe(response => {
            if (response.data) {
                const pat = response.data;
                this.patients = pat.reverse();
            } else {
                this.patients = [];
            }
        }, error => {
            console.log(error);
            this.patients = [];
        });

        this.filteredPatients = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    createBudget() {
        if (this.isFrom === 'patient') {
            this.budgetFormGroup.patchValue({
                patientRutCtrl: this.patient.rut
            });
        }
        if (this.budgetFormGroup.valid) {
            this.budget.patientRut = this.budgetFormGroup.get('patientRutCtrl').value;
            this.budget.discount = this.budgetFormGroup.get('discountCtrl').value;
            this._apiService.createBudget(this.budget).subscribe(response => {
                if (response.success) {
                    this._pdfService.budgetPDF(response.data);
                    this.openSnackBar('Presupuesto registrado con éxito', 'Aceptar');
                    this._router.navigate(['../'], {relativeTo: this._route}).then();
                } else {
                    this.openSnackBar('No se ha podido registrar el presupuesto', 'Aceptar');
                }
            }, error => {
                console.log(error);
                this.openSnackBar('No se ha podido registrar el presupuesto', 'Aceptar');
            });
        } else {
            this.openSnackBar('Datos insuficientes para registrar el presupuesto', 'Aceptar');
        }
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
                this.dataSource = new MatTableDataSource<TreatmentsBudget>(this.budget.treatments);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.totalPrice();
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
                this.dataSource = new MatTableDataSource<TreatmentsBudget>(this.budget.treatments);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.totalPrice();
            }
        });
    }

    totalPrice() {
        this.budget.totalPrice = 0;
        for (let i = 0; i < this.budget.treatments.length; i++) {
            this.budget.totalPrice = this.budget.totalPrice + this.budget.treatments[i].price;
        }
    }

    findPatient() {
        this._apiService.getPatientByRut(this.budget.patientRut).subscribe(response => {
            if (response.data) {
                this.pat2 = response.data;
                //console.log(this.pat2);
            } else {
                //console.log('error');
            }
        }, error => {
            console.log(error);
        });
    }

    private _filter(name: string): Patients[] {
        const filterValue = name.toLowerCase();
        return this.patients ? this.patients.filter(patient => patient.rut.toLowerCase().indexOf(filterValue) === 0) : [];
    }

    checkRut(rut) {
        // Despejar Puntos
        let re = /\./gi;
        let valor = rut.replace(re, '');
        // Despejar Guión
        valor = valor.replace('-', '');
        // Aislar Cuerpo y Dígito Verificador
        const cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();
        const d1 = valor.slice(0, -7);
        const d2 = valor.slice(d1.length, -4);
        const d3 = valor.slice(d1.length + d2.length, -1);

        // Formatear RUN
        //rut = cuerpo + '-' + dv;
        rut = d1 + '.' + d2 + '.' + d3 + '-' + dv;

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if (cuerpo.length < 7) {
            //rut.setCustomValidity('RUT Incompleto');
            return false;
        }

        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;

        // Para cada dígito del Cuerpo
        for ( let i = 1 ; i <= cuerpo.length ; i++) {

            // Obtener su Producto con el Múltiplo Correspondiente
            const index = multiplo * valor.charAt(cuerpo.length - i);

            // Sumar al Contador General
            suma = suma + index;

            // Consolidar Múltiplo dentro del rango [2,7]
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

        }

        // Calcular Dígito Verificador en base al Módulo 11
        const dvEsperado = 11 - (suma % 11);

        // Casos Especiales (0 y K)
        dv = (dv == 'K') ? 10 : dv;
        dv = (dv == 0) ? 11 : dv;

        // Validar que el Cuerpo coincide con su Dígito Verificador
        if (dvEsperado != dv) {
            //rut.setCustomValidity('RUT Inválido');
            return false;
        }

        // Si todo sale bien, eliminar errores (decretar que es válido)
        //rut.setCustomValidity('');
        this.patient.rut = rut;
    }
}
