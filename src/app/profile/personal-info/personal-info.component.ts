import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {

    isEditing: boolean = false;
    editingPasswordForm: boolean = false;

    profileForm: FormGroup = new FormGroup({});
    changePasswordForm : FormGroup = new FormGroup({});

    formInitializer() {
      this.profileForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
      this.changePasswordForm = this.fb.group({
        newPassword: ['', [
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(20),          
        ]
        ],
        confirmPassword: ['', [Validators.required, confirmPasswordValidator('newPassword')]],
      });
    }

    constructor(
        private _profileService: ProfileService,
        private _toasterService: ToastrService,
        private fb: FormBuilder
    ) {
      this.formInitializer();
    }

    getProfile() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
        this._profileService.getProfile(user.id).subscribe((res: any) => {
            if (res.success) {              
              this.profileForm.patchValue({
                name: res.data.name,
                email: res.data.email,
              });
              this.profileForm.controls['name'].disable()
              this.profileForm.controls['email'].disable()            
            }
        },
        (err: any) => {
          this._toasterService.error(err.error.message, 'Error');
        }
        );
    }

    handleEdit() {      
      this.isEditing = true;      
      this.profileForm.controls['name'].enable()
      this.profileForm.controls['email'].enable() 
    }

    handlePasswordChange() {
      this.editingPasswordForm = true;  
    }


    onPasswordChangeSubmit(){
      if(this.changePasswordForm.invalid) {
        return;
      }      
      const values ={
        password: this.changePasswordForm.value.newPassword
      }
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      this._profileService.updatePassword(values).subscribe((res: any) => {
        if (res.success) {
          this._toasterService.success('Password changed successfully', 'Success');
          this.editingPasswordForm = false;
          this.changePasswordForm.reset();          
        }
      });
    }

    handleCancel() {
      this.isEditing = false;
      this.editingPasswordForm = false;
      this.profileForm.controls['name'].disable()
      this.profileForm.controls['email'].disable()
    }

    onSubmit() {
      if(this.profileForm.invalid) {
        return;
      }      
      const values ={
        ...this.profileForm.value
      }
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      this._profileService.updateProfile(userId, values).subscribe((res: any) => {
        if (res.success) {
          this._toasterService.success('Profile updated successfully', 'Success');
          this.isEditing = false;
          const user  = {
            id: res.data.id,
            name: res.data.name,
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.profileForm.controls['name'].disable()
          this.profileForm.controls['email'].disable() 
        }
      });
    }


    ngOnInit(): void {
        this.getProfile();
    }

}





function confirmPasswordValidator(controlToCompareName: string){
  return (control: FormControl) => {
    const controlToCompare: any = control.root.get(controlToCompareName);
    if (controlToCompare && controlToCompare.value && control.value != controlToCompare.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  
}