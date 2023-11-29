import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(20)
      ]]
    });
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    const values ={
      ...this.loginForm.value
    }
  
    this._authService.login(values.email, values.password).subscribe(
      (res: any) => {        
        if(res.success){
          this.toastr.success('Logged in successfully', 'Success');
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
          this.toastr.error('Invalid credentials', 'Error');
        }
      },     
    );
  }

 
}
