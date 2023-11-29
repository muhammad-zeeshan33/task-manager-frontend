import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({});


  formInitializer() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(20)
      ]
      ],
    });
  }

  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formInitializer();
  }

  register() {
    if(this.registerForm.invalid) {
      return;
    }

    const values ={
      ...this.registerForm.value
    }
    this._authService.register(
      values.name, 
      values.email, 
      values.password
    ).subscribe(
      (res: any) => {        
        if(res.success){
          this.toastr.success('Registred successfully', 'Success');
          localStorage.setItem('token', res.data.access_token);
          const user  = {
            id: res.data.id,
            name: res.data.name,
          }
          localStorage.setItem('user', JSON.stringify(user));
          this._authService.isLoggedIn = true;
          this.router.navigateByUrl('/tasks');
        }
        else{
          this.toastr.error(res.message, 'Error');
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.toastr.error('An error occurred: ' + err.error.error, 'Error');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.toastr.error('Server error: ' + err.error.error, 'Error');
        }
      }
    );
  }
}
