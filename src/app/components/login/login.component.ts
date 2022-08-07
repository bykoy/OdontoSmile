import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide = true;

    user = {
        email: '',
        password: ''
    };

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

    constructor(private _router: Router,
                public snackBar: MatSnackBar,
                private _apiService: ApiService) {
    }

    ngOnInit() {
        this.validateSession();
    }

    validateSession() {
        this._apiService.validate().subscribe(response => {
            if (response.success) {
                this._router.navigate(['/platform']).then(responseRoute => {
                    //console.log(responseRoute);
                });
            }
        });
    }

    login() {
        if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID') {
            this._apiService.login(this.user).subscribe(
                response => {
                    if (response.success) {                        
                        const user = JSON.stringify({
                            "firstName": response.data.user.firstName,
                            "lastName": response.data.user.lastName,
                            "role": response.data.role
                        });
                        
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('user', user);
                        this.openSnackBar('Inicio de sesión exitoso', 'Aceptar');
                          
                        this._router.navigate(['/platform']).then(responseRoute => {
                            console.log(responseRoute);
                        });

                    } else {
                        this.openSnackBar(response.message, 'Aceptar');
                    }
                }
            );
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }
}
