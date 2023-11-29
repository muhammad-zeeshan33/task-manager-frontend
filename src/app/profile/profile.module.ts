import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.routing.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
