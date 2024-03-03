import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
AuthService
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  isLoading:boolean = false;
  step1: boolean = true
  step2: boolean = false
  step3: boolean = false
  email: string = ''

  userMsg: string = ''
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('')
  })

  resetcodeform: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  })

  resetpassword: FormGroup = new FormGroup({
    newPassword: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  })


  forgetpassword(): void {
    this.isLoading = true;
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email
    this._AuthService.forgetPassword(userEmail).subscribe({
      next: response => {
        console.log(response);
        this.userMsg = response.message
        this.step1 = false
        this.step2 = true
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.userMsg = err.error.message
        this.isLoading = false;
      }
    })
  }


  resetcode(): void {
    this.isLoading = true;
    console.log(this.resetcodeform.value.resetCode)
    this._AuthService.resetCode(this.resetcodeform.value.resetCode).subscribe({
      next: response => {
        this.isLoading = false;
        console.log(response);
        this.userMsg = response.status
        this.step2 = false
        this.step3 = true
      },
      error: err => {
        this.isLoading = false;
        this.userMsg = err.error.message
        console.log(err);
      }
    })
  }


  newpassword(): void {
    this.isLoading = true;
    let resetform = this.resetpassword.value
    resetform.email = this.email
    this._AuthService.resetPassword(resetform).subscribe({
      next: response => {
        this.isLoading = false;
        console.log(response);
        if (response?.token) {
          this._Router.navigate(['/login'])
        }

      }, error: err => {
        console.log(err);
        this.userMsg = err.error.message
        this.isLoading = false;
      }

    })
  }
}
