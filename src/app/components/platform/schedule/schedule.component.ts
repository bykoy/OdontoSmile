import {Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Quotes} from '../../../models/quotes';
import {CreateQuotesComponent} from './dialogs/create-quotes/create-quotes.component';
import {UpdatePaymentComponent} from './dialogs/update-payment/update-payment.component';
import {DeleteQuotesComponent} from './dialogs/delete-quotes/delete-quotes.component';
import {Dentists} from '../../../models/dentists';
import {Patients} from '../../../models/patients';


import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {DetailComponent} from './detail/detail.component';
import {map, startWith} from 'rxjs/operators';
import {PatientsQuotes} from '../../../models/patientsQuotes';


const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

    patientFormGroup: FormGroup;
    scheduleFormGroup: FormGroup;

    // Identificadores de las columnas
    displayedColumns = ['state', 'date', 'hour', 'description', 'payment', 'dentist', 'actions'];
    dataSource;

    ///////////////////////////////////////////////////////
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
    patQuo: PatientsQuotes;
    patien: String;
    patients: Patients[];

    myControl = new FormControl();
    filteredPatients: Observable<Patients[]>;
    /////////////////////////////////////////////////
    @ViewChild('modalContent', ) modalContent: TemplateRef<any>;

    view: CalendarView = CalendarView.Week;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        /*{
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Editar', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Eliminar', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.openDeleteQuote(quotes._id);
            },
        },*/
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
        /*{
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions,
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue,
            allDay: true,
        },
        {  start: addHours(startOfDay(new Date()), 2),
            end: addHours(new Date(), 2),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },*/
    ];

    excludeDays: number[] = [0];

    fecha: Date = new Date();

    activeDayIsOpen = true;
    /////////////////////////////////////////////////
    date = new FormControl(new Date());


    // Se inicializa el paginador y ordenamiento de tablas de Material
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    quotes: Quotes[];
    quotes2T: Quotes[];
    quotes2: Quotes[] = [];
    quotesPend: Quotes[] = [];

    dentQuo: Dentists;
    dentist: Dentists;
    dentists: Dentists[];

    patient: Patients;
    patientRut = '';

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                public snackBar: MatSnackBar,
                private _formBuilder: FormBuilder,
                private dialog: MatDialog,
                private modal: NgbModal) {
        this._apiService.getDentists().subscribe(response => {
            if (response.data) {
                this.dentists = response.data;
            } else {
                this.dentists = [];
            }
        }, error => {
            console.log(error);
            this.dentists = [];
        });
    }

  ngOnInit() {
        if (this.dentist != null) {
          this._apiService.getQuotesDentist(this.dentist.rut).subscribe(response => {
              if (response.data) {
                  this.quotes = response.data;
                  this.events = [];
                  for (let i = 0; i < this.quotes.length; i++) {
                      this.actions = [
                          {
                              label: '<i class="fas fa-info-circle"></i> ',
                              a11yLabel: 'Detalle',
                              onClick: ({ event }: { event: CalendarEvent }): void => {
                                  this.openDetail(this.quotes[i]._id);
                              },
                          },
                          {
                              label: '<i class="far fa-credit-card"></i> ',
                              a11yLabel: 'Abonar',
                              onClick: ({ event }: { event: CalendarEvent }): void => {
                                  this.openUpdatePayment(this.quotes[i]._id);
                              },
                          },
                          {
                              label: ' <i class="fas fa-notes-medical"></i>',
                              a11yLabel: 'Ficha Clinica',
                              onClick: ({ event }: { event: CalendarEvent }): void => {
                                  this.openPatient(this.quotes[i].patient.rut);
                              },
                          },
                          {
                              label: '<i class="fas fa-fw fa-trash-alt"></i>',
                              a11yLabel: 'Delete',
                              onClick: ({ event }: { event: CalendarEvent }): void => {
                                  this.events = this.events.filter((iEvent) => iEvent !== event);
                                  this.openDeleteQuote(this.quotes[i]._id);
                              },
                          },
                      ];
                      if (this.quotes[i].state) {
                          this.events = [
                              ...this.events,
                              {
                                  title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                  + ' - ' + this.quotes[i].description,
                                  start: new Date(this.quotes[i].startDay),
                                  end: new Date(this.quotes[i].endDay),
                                  color: colors.blue,
                                  actions: this.actions
                              },
                          ];
                      } else {
                          this.events = [
                              ...this.events,
                              {
                                  title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                  + ' - ' + this.quotes[i].description,
                                  start: new Date(this.quotes[i].startDay),
                                  end: new Date(this.quotes[i].endDay),
                                  color: colors.red,
                                  actions: this.actions
                              },
                          ];
                      }
                  }
              } else {
                  this.quotes = [
                      {
                          _id: '1',
                          startDay: null,
                          endDay: null,
                          patient: null,
                          description: 'error',
                          state: false,
                          payment: 0,
                          rut_dentists: ''
                      }
                  ];
              }
          }, error => {
              console.log(error);
              this.quotes = [
                  {
                      _id: '1',
                      startDay: null,
                      endDay: null,
                      patient: null,
                      description: 'error',
                      state: false,
                      payment: 0,
                      rut_dentists: ''
                  }
              ];
          });
        } else {
            this._apiService.getQuotes().subscribe(response => {
                if (response.data) {
                    this.quotes = response.data;
                    this.events = [];
                    for (let i = 0; i < this.quotes.length; i++) {
                        this.actions = [
                            {
                                label: '<i class="fas fa-info-circle"></i> ',
                                a11yLabel: 'Detalle',
                                onClick: ({ event }: { event: CalendarEvent }): void => {
                                    this.openDetail(this.quotes[i]._id);
                                },
                            },
                            {
                                label: '<i class="far fa-credit-card"></i> ',
                                a11yLabel: 'Abonar',
                                onClick: ({ event }: { event: CalendarEvent }): void => {
                                    this.openUpdatePayment(this.quotes[i]._id);
                                },
                            },
                            {
                                label: ' <i class="fas fa-notes-medical"></i>',
                                a11yLabel: 'Ficha Clinica',
                                onClick: ({ event }: { event: CalendarEvent }): void => {
                                    this.openPatient(this.quotes[i].patient.rut);
                                },
                            },
                            {
                                label: '<i class="fas fa-fw fa-trash-alt"></i>',
                                a11yLabel: 'Delete',
                                onClick: ({ event }: { event: CalendarEvent }): void => {
                                    this.events = this.events.filter((iEvent) => iEvent !== event);
                                    this.openDeleteQuote(this.quotes[i]._id);
                                },
                            },
                        ];
                        if (this.quotes[i].state) {
                            this.events = [
                                ...this.events,
                                {
                                    title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                    + ' - ' + this.quotes[i].description,
                                    start: new Date(this.quotes[i].startDay),
                                    end: new Date(this.quotes[i].endDay),
                                    color: colors.blue,
                                    actions: this.actions
                                },
                            ];
                        } else {
                            this.events = [
                                ...this.events,
                                {
                                    title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                    + ' - ' + this.quotes[i].description,
                                    start: new Date(this.quotes[i].startDay),
                                    end: new Date(this.quotes[i].endDay),
                                    color: colors.red,
                                    actions: this.actions
                                },
                            ];
                        }
                    }
                } else {
                    this.quotes = [
                        {
                            _id: '1',
                            startDay: null,
                            endDay: null,
                            patient: null,
                            description: 'error',
                            state: false,
                            payment: 0,
                            rut_dentists: ''
                        }
                    ];
                }
            }, error => {
                console.log(error);
                this.quotes = [
                    {
                        _id: '1',
                        startDay: null,
                        endDay: null,
                        patient: null,
                        description: 'error',
                        state: false,
                        payment: 0,
                        rut_dentists: ''
                    }
                ];
            });
        }

      this.scheduleFormGroup = this._formBuilder.group({
          dentistCtrl: ['', Validators.required]
      });

      this.patientFormGroup = this._formBuilder.group({
          rutCtrl: ['', Validators.required]
      });



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

  // Agregar una nueva Cita
    newAppointment(d:Date) {
        this.openCreateAppointment(d);
    }

    openCreateAppointment(d:Date): void {
        const dialogRef = this.dialog.open(CreateQuotesComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Nueva Cita',
                dateI: d
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }
  //////////////////////////////////////////////////
    /* Revisar si el paciente aistió o no
    readyQuotes(value: boolean, elementIndex: number) {
        const index = elementIndex + this.paginator.pageIndex * this.paginator.pageSize;
        this.quotes[index].state = value;
        this._apiService.updateQuote(this.quotes[index]).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Cita actualizada', 'Aceptar');
                this.ngOnInit();
            } else {
                this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
        });
    }*/
   //////////////////////////////////////////////////
    openUpdatePayment(_idB): void {
        const dialogRef = this.dialog.open(UpdatePaymentComponent, {
            maxWidth: '350px',
            width: '98%',
            data: {
                title: 'Abono del paciente',
                _idB: _idB
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    //////////////////////////////////////////////////
    // getPatientByRut
    openPatient(rut): void {
        this._apiService.getPatientByRut(rut).subscribe(response => {
            if (response.data) {
                this._router.navigate(['/platform/clients/' + response.data._id + '/clinical-records']).then(response => {
                    console.log(response);
                });
            } else {
                console.log('error');
            }
        }, error => {
            console.log(error);
        });
    }


    //////////////////////////////////////////////////
    openDeleteQuote(_id): void {
        const dialogRef = this.dialog.open(DeleteQuotesComponent, {
            maxWidth: '650px',
            width: '98%',
            data: {
                title: 'Eliminar Cita',
                _id: _id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }

    //////////////////////////////////////////////////

    openDetail(_idB): void {
        const dialogRef = this.dialog.open(DetailComponent, {
            maxWidth: '650px',
            width: '98%',
            maxHeight: '1000px',
            data: {
                title: 'Detalle del paciente',
                _idB: _idB
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.ngOnInit();
        });
    }
    //////////////////////////////////////////////////

    onFilterDentist(dentist) {
        this.dentist = dentist;
        this._apiService.getQuotesDentist(dentist.rut).subscribe(response => {
            if (response.data) {
                this.quotes = response.data;
                this.events = [];
                console.log(this.quotes);
                for (let i = 0; i < this.quotes.length; i++) {
                    this.actions = [
                        {
                            label: '<i class="fas fa-info-circle"></i> ',
                            a11yLabel: 'Detalle',
                            onClick: ({ event }: { event: CalendarEvent }): void => {
                                this.openDetail(this.quotes[i]._id);
                            },
                        },
                        {
                            label: '<i class="far fa-credit-card"></i> ',
                            a11yLabel: 'Abonar',
                            onClick: ({ event }: { event: CalendarEvent }): void => {
                                this.openUpdatePayment(this.quotes[i]._id);
                            },
                        },
                        {
                            label: ' <i class="fas fa-notes-medical"></i>',
                            a11yLabel: 'Ficha Clinica',
                            onClick: ({ event }: { event: CalendarEvent }): void => {
                                this.openPatient(this.quotes[i].patient.rut);
                            },
                        },
                        {
                            label: '<i class="fas fa-fw fa-trash-alt"></i>',
                            a11yLabel: 'Delete',
                            onClick: ({ event }: { event: CalendarEvent }): void => {
                                this.events = this.events.filter((iEvent) => iEvent !== event);
                                this.openDeleteQuote(this.quotes[i]._id);
                            },
                        },
                    ];
                    if (this.quotes[i].state) {
                        this.events = [
                            ...this.events,
                            {
                                title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                + ' - ' + this.quotes[i].description,
                                start: new Date(this.quotes[i].startDay),
                                end: new Date(this.quotes[i].endDay),
                                color: colors.blue,
                                actions: this.actions
                            },
                        ];
                    } else {
                        this.events = [
                            ...this.events,
                            {
                                title: this.quotes[i].patient.firstName + ' ' + this.quotes[i].patient.lastName
                                + ' - ' + this.quotes[i].description,
                                start: new Date(this.quotes[i].startDay),
                                end: new Date(this.quotes[i].endDay),
                                color: colors.red,
                                actions: this.actions
                            },
                        ];
                    }
                }
            } else {
                this.quotes = [
                    {
                        _id: '1',
                        startDay: null,
                        endDay: null,
                        patient: null,
                        description: 'error',
                        state: false,
                        payment: 0,
                        rut_dentists: ''
                    }
                ];
            }
            this.dataSource = new MatTableDataSource<Quotes>(this.quotes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.quotes = [
                {
                    _id: '1',
                    startDay: null,
                    endDay: null,
                    patient: null,
                    description: 'error',
                    state: false,
                    payment: 0,
                    rut_dentists: ''
                }
            ];
            this.dataSource = new MatTableDataSource<Quotes>(this.quotes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    checkRut(rut) {
        // Despejar Puntos
        const re = /\./gi;
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
        // rut = cuerpo + '-' + dv;
        rut = d1 + '.' + d2 + '.' + d3 + '-' + dv;

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if (cuerpo.length < 7) {
            // rut.setCustomValidity('RUT Incompleto');
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
            // rut.setCustomValidity('RUT Inválido');
            return false;
        }

        // Si todo sale bien, eliminar errores (decretar que es válido)
        // rut.setCustomValidity('');
        this.patientRut = rut;
    }

    private _filter(name: string): Patients[] {
        const filterValue = name.toLowerCase();
        return this.patients ? this.patients.filter(patient => patient.rut.toLowerCase().indexOf(filterValue) === 0) : [];
    }

    findPatient() {
        this._apiService.getPatientByRut(this.patien).subscribe(response => {
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

    searchPatient() {
        // console.log('Primero', this.pat2);

        this._apiService.getQuotes().subscribe(response => {
            if (response.data) {
                this.quotes2T = response.data;
                this.quotes2 = [];
                for (let i = 0; i < this.quotes2T.length; i++) {
                    if (this.quotes2T[i].patient.rut == this.pat2.rut) {
                        // this.quotes2T[i].startDay = new Date(this.quotes2T[i].startDay);

                        this._apiService.getDentistByRut(this.quotes2T[i].rut_dentists).subscribe(response => {
                            if (response.data) {
                                this.dentQuo = response.data;
                                this.quotes2T[i].rut_dentists = this.dentQuo.firstName + ' ' + this.dentQuo.lastName;
                            } else {
                                console.log('error');
                            }
                        }, error => {
                            console.log(error);
                        });

                        // Se agrega la información de la cita del paciente al arreglo
                        this.quotes2.push(this.quotes2T[i]);
                    }
                }

                const bud = this.quotes2;
                this.quotes2 = bud.reverse();
                // console.log('Tercero', this.quotes2);
            } else {
                this.quotes2 = [
                    {
                        _id: '1',
                        startDay: null,
                        endDay: null,
                        patient: null,
                        description: 'error',
                        state: false,
                        payment: 0,
                        rut_dentists: ''
                    }
                ];
            }
            this.dataSource = new MatTableDataSource<Quotes>(this.quotes2);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => {
            console.log(error);
            this.quotes2 = [
                {
                    _id: '1',
                    startDay: null,
                    endDay: null,
                    patient: null,
                    description: 'error',
                    state: false,
                    payment: 0,
                    rut_dentists: ''
                }
            ];
            this.dataSource = new MatTableDataSource<Quotes>(this.quotes2);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    //////////////////////////////////////////////////
    // Revisar si el paciente aistió o no
    readyQuotes(value: boolean, quot: Quotes) {
        quot.state = value;
        this._apiService.updateQuote(quot).subscribe(response => {
            if (response.success) {
                this.openSnackBar('Cita actualizada', 'Aceptar');
                this.ngOnInit();
            } else {
                this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
            }
        }, error => {
            console.log(error);
            this.openSnackBar('No se pudo actualizar la cita', 'Aceptar');
        });
    }

    ////////////////////////////////////
    ////////////////////////////////////
    ////////////////////////////////////
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    /*eventTimesChanged({
                          event,
                          newStart,
                          newEnd,
                      }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }*/

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
}
