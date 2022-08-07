import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';

// Componentes
import { AppComponent } from './app.component';
// Componentes de Plataforma
import { PlatformComponent } from './components/platform/platform.component';
import { TreatmentsComponent } from './components/platform/treatments/treatments.component';
import { BudgetsComponent } from './components/platform/budgets/budgets.component';
import { ClientsComponent } from './components/platform/clients/clients.component';
import { NavbarPlatformComponent } from './components/platform/partials/navbar-platform/navbar-platform.component';
import { FooterPlatformComponent } from './components/platform/partials/footer-platform/footer-platform.component';
import { SidenavPlatformComponent } from './components/platform/partials/sidenav-platform/sidenav-platform.component';
import { HomeComponent } from './components/platform/home/home.component';
import { CreatePatientComponent } from './components/platform/clients/dialogs/create-patient/create-patient.component';
import { UpdatePatientComponent } from './components/platform/clients/dialogs/update-patient/update-patient.component';
import { DeletePatientComponent } from './components/platform/clients/dialogs/delete-patient/delete-patient.component';
import { CreateTreatementsComponent } from './components/platform/treatments/dialogs/create-treatements/create-treatements.component';
import { UpdateTreatmentsComponent } from './components/platform/treatments/dialogs/update-treatments/update-treatments.component';
import { DeleteTreatmentsComponent } from './components/platform/treatments/dialogs/delete-treatments/delete-treatments.component';
import { PatientComponent } from './components/platform/clients/patient/patient.component';
import { DeleteBudgetComponent } from './components/platform/budgets/dialogs/delete-budget/delete-budget.component';
import { LoginComponent} from './components/login/login.component';
import { PdfService } from './services/pdf.service';
import { UsersComponent } from './components/platform/users/users.component';
import { ProfileComponent } from './components/platform/profile/profile.component';
import { BudgetComponent } from './components/platform/budgets/budget/budget.component';
import { CreateTreatmentBudgetComponent } from './components/platform/budgets/dialogs/create-treatment-budget/create-treatment-budget.component';
import { UpdateTreatmentBudgetComponent } from './components/platform/budgets/dialogs/update-treatment-budget/update-treatment-budget.component';
import { DeleteTreatmentBudgetComponent } from './components/platform/budgets/dialogs/delete-treatment-budget/delete-treatment-budget.component';
import { CreateBudgetComponent } from './components/platform/budgets/create-budget/create-budget.component';
import { UpdateContactInformationComponent } from './components/platform/profile/dialogs/update-contact-information/update-contact-information.component';
import { UpdatePasswordComponent } from './components/platform/profile/dialogs/update-password/update-password.component';
import { DeleteUserComponent } from './components/platform/users/dialogs/delete-user/delete-user.component';
import { CreateUserComponent } from './components/platform/users/dialogs/create-user/create-user.component';
import { ClinicalRecordsComponent } from './components/platform/clinical-records/clinical-records.component';
import { TreatementComponent } from './components/platform/clinical-records/treatement/treatement.component';
import { DetailsComponent } from './components/platform/clinical-records/treatement/dialogs/details/details.component';
import { ScheduleComponent } from './components/platform/schedule/schedule.component';
import { CreateQuotesComponent } from './components/platform/schedule/dialogs/create-quotes/create-quotes.component';
import { UpdatePaymentComponent } from './components/platform/schedule/dialogs/update-payment/update-payment.component';
import { DeleteQuotesComponent } from './components/platform/schedule/dialogs/delete-quotes/delete-quotes.component';
import { DentistsComponent } from './components/platform/dentists/dentists.component';
import { CreateDentistComponent } from './components/platform/dentists/dialogs/create-dentist/create-dentist.component';
import { DeleteDentistComponent } from './components/platform/dentists/dialogs/delete-dentist/delete-dentist.component';
import { UpdateDentistComponent } from './components/platform/dentists/dialogs/update-dentist/update-dentist.component';
import { DetailComponent } from './components/platform/schedule/detail/detail.component';
import { UploadService } from './services/upload.service';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MovementsComponent } from './components/platform/movements/movements.component';
import { SuppliesComponent } from './components/platform/supplies/supplies.component';


//componente del demo
//import { DemoComponent } from './component';

registerLocaleData(localeEs, 'es');


//create our cost var with the information about the format that we want
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MM YYYY',
    },
};


@NgModule({
    declarations: [
        AppComponent,
        PlatformComponent,
        TreatmentsComponent,
        BudgetsComponent,
        ClientsComponent,
        NavbarPlatformComponent,
        FooterPlatformComponent,
        SidenavPlatformComponent,
        HomeComponent,
        PatientComponent,
        CreatePatientComponent,
        UpdatePatientComponent,
        DeletePatientComponent,
        CreateTreatementsComponent,
        UpdateTreatmentsComponent,
        DeleteTreatmentsComponent,
        DeleteBudgetComponent,
        LoginComponent,
        UsersComponent,
        ProfileComponent,
        BudgetComponent,
        CreateTreatmentBudgetComponent,
        UpdateTreatmentBudgetComponent,
        DeleteTreatmentBudgetComponent,
        CreateBudgetComponent,
        UpdateContactInformationComponent,
        UpdatePasswordComponent,
        DeleteUserComponent,
        CreateUserComponent,
        ClinicalRecordsComponent,
        TreatementComponent,
        DetailsComponent,
        ScheduleComponent,
        CreateQuotesComponent,
        UpdatePaymentComponent,
        DeleteQuotesComponent,
        DentistsComponent,
        CreateDentistComponent,
        DeleteDentistComponent,
        UpdateDentistComponent,
        DetailComponent,
        MovementsComponent,
        SuppliesComponent
    ],
    entryComponents: [
        CreatePatientComponent,
        UpdatePatientComponent,
        DeletePatientComponent,
        CreateTreatementsComponent,
        UpdateTreatmentsComponent,
        DeleteTreatmentsComponent,
        DeleteBudgetComponent,
        CreateTreatmentBudgetComponent,
        UpdateTreatmentBudgetComponent,
        DeleteTreatmentBudgetComponent,
        UpdateContactInformationComponent,
        UpdatePasswordComponent,
        DeleteUserComponent,
        CreateUserComponent,
        DeleteQuotesComponent,
        DeleteDentistComponent,
        UpdateDentistComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        MatNativeDateModule,
        AppRoutingModule,
        CommonModule,
        NgbModalModule,
        BrowserModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    providers: [ApiService,
        PdfService,
        UploadService,
        CurrencyPipe,
        { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: MAT_DATE_LOCALE, useValue: 'es' },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}