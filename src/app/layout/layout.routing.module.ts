import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from '../services/authGuardService/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [         
      {
        path: 'tasks',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('../tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      

    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
