import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean = true;
  errMessage:string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.checkRepasswordMatch});

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  submitRegister(dataForm: FormGroup) {
    console.log(dataForm);
    this.isLoading = false;
    if (dataForm.valid) {
      console.log(dataForm.value);
      this._AuthService.signUp(dataForm.value).subscribe({
        next: (response) => {
          if (response.message === "success") {
            this._Router.navigate(['/login']);
            this.isLoading = true;
          }
        },
        error: (err) => {
          this.isLoading = true;
          this.errMessage= err.error.message;
        }
      })
    }
  }

  checkRepasswordMatch(dataForm:any){
    if(dataForm.get('password')?.value === dataForm.get('rePassword')?.value){
      return null
    }
    else{
      dataForm.get('rePassword')?.setErrors({rePasswordMatch:'rePassword Not Match Password'})
      return {rePasswordMatch:'rePassword Not Match Password'}
    }
  }

}
