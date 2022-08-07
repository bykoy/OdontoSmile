import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlatformComponent} from './components/platform/platform.component';
import {TreatmentsComponent} from './components/platform/treatments/treatments.component';
import {BudgetsComponent} from './components/platform/budgets/budgets.component';
import {ClientsComponent} from './components/platform/clients/clients.component';
import {HomeComponent} from './components/platform/home/home.component';
import {PatientComponent} from './components/platform/clients/patient/patient.component';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/platform/users/users.component';
import {ProfileComponent} from './components/platform/profile/profile.component';
import {BudgetComponent} from './components/platform/budgets/budget/budget.component';
import {CreateBudgetComponent} from './components/platform/budgets/create-budget/create-budget.component';
import {ClinicalRecordsComponent} from './components/platform/clinical-records/clinical-records.component';
import {TreatementComponent} from './components/platform/clinical-records/treatement/treatement.component';
import {DetailsComponent} from './components/platform/clinical-records/treatement/dialogs/details/details.component';
import {ScheduleComponent} from './components/platform/schedule/schedule.component';
import {CreateQuotesComponent} from './components/platform/schedule/dialogs/create-quotes/create-quotes.component';
import {UpdatePaymentComponent} from './components/platform/schedule/dialogs/update-payment/update-payment.component';
import {DentistsComponent} from './components/platform/dentists/dentists.component';
import {CreateDentistComponent} from './components/platform/dentists/dialogs/create-dentist/create-dentist.component';
import {DetailComponent} from './components/platform/schedule/detail/detail.component';
import {MovementsComponent} from './components/platform/movements/movements.component';
import {NotRoleComponent} from './components/platform/not-role/not-role.component';
import {SuppliesComponent} from './components/platform/supplies/supplies.component';
import {RoleGuard} from './role.guard';

const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        data: {title: 'Log In'}
    },
    {
        path: 'platform', component: PlatformComponent, children: [
            {
                path: 'home',
                pathMatch: 'full',
                component: HomeComponent,
                data: {title: 'Inicio'}
            },
            {
                path: 'not-role',
                pathMatch: 'full',
                component: NotRoleComponent,
                data: {title: 'Sin Roles'}
            },
            {
                path: 'supplies',
                pathMatch: 'full',
                component: SuppliesComponent,
                data: {role: ['Admin'], title: 'Tratamientos'},
                canActivate: [RoleGuard]
            },
            {
                path: 'treatments',
                pathMatch: 'full',
                component: TreatmentsComponent,
                data: {role: ['Secre', 'Admin'], title: 'Tratamientos'},
                canActivate: [RoleGuard]
            },
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: ScheduleComponent,
                        data: {role: ['Secre', 'Doc', 'Admin'], title: 'Schedule'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: 'create',
                        pathMatch: 'full',
                        component: CreateQuotesComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Crear Cita'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: 'payment',
                        pathMatch: 'full',
                        component: UpdatePaymentComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Abonar'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: 'detail',
                        pathMatch: 'full',
                        component: DetailComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Detalle'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: '**', redirectTo: '', pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'budgets',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: BudgetsComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Presupuestos'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: 'create',
                        pathMatch: 'full',
                        component: CreateBudgetComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Crear Presupuesto'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: ':budgetId',
                        pathMatch: 'full',
                        component: BudgetComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Presupuesto'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: '**', redirectTo: '', pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'clients',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: ClientsComponent,
                        data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Pacientes'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                component: PatientComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Paciente'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: 'create',
                                pathMatch: 'full',
                                component: CreateBudgetComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], isFrom: 'patient'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: 'clinical-records',
                                pathMatch: 'full',
                                component: ClinicalRecordsComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Ficha Clínica'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: ':budgetId',
                                pathMatch: 'full',
                                component: BudgetComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], isFrom: 'patient'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: '**', redirectTo: '', pathMatch: 'full'
                            }
                        ]
                    },
                    {
                        path: '**', redirectTo: '', pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'tratement',
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: ':budgetId',
                                pathMatch: 'full',
                                component: TreatementComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], isFrom: 'Tratamientos'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: 'detail',
                                pathMatch: 'full',
                                component: DetailsComponent,
                                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], isFrom: 'detail'},
                                canActivate: [RoleGuard]
                            },
                            {
                                path: '**', redirectTo: '', pathMatch: 'full'
                            }
                        ]
                    },
                    {
                        path: '**', redirectTo: '', pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'dentist',
                pathMatch: 'full',
                component: DentistsComponent,
                data: {role: 'Admin', title: 'Dentistas'},
                canActivate: [RoleGuard]
            },
            {
                path: 'dentist',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: DentistsComponent,
                        data: {role: 'Admin', title: 'Dentistas'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: 'create',
                        pathMatch: 'full',
                        component: CreateDentistComponent,
                        data: {role: 'Admin', title: 'Crear Dentistas'},
                        canActivate: [RoleGuard]
                    },
                    {
                        path: '**', redirectTo: '', pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'movements',
                pathMatch: 'full',
                component: MovementsComponent,
                data: {role: 'Admin', title: 'Movimientos'},
                canActivate: [RoleGuard]
            },
            {
                path: 'users',
                pathMatch: 'full',
                component: UsersComponent,
                data: {role: 'Admin', title: 'Usuarios'},
                canActivate: [RoleGuard]
            },
            {
                path: 'profile',
                pathMatch: 'full',
                component: ProfileComponent,
                data: {role: ['Asist', 'Secre', 'Doc', 'Admin'], title: 'Perfil'},
                canActivate: [RoleGuard]
            },
            {path: '**', redirectTo: 'home', pathMatch: 'full'},
        ]
    },
    {path: '**', redirectTo: 'login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
