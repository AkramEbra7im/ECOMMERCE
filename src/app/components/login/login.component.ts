import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errMessage: string = '';
  isLoading: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  submitLogin(data: FormGroup) {
    this.isLoading = false;
    if (data.valid) {
      this._AuthService.signIn(data.value).subscribe({
        next: response => {
          if (response.message === "success") {
            localStorage.setItem('userToken',response.token);
            this._AuthService.decodeUserToken();
            this._Router.navigate(['/home'])
            this.isLoading = true;
          }
        },
        error: err => {
          this.errMessage = err.error.message;
          this.isLoading = true;
        }
      })
    }

  }
}
