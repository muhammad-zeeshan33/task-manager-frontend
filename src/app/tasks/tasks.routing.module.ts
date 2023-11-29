import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {EditTaskComponent} from './edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: TasklistComponent,
  },
  {
    path: 'add',
    component: AddTaskComponent,
  },
  {
    path: 'edit/:id',
    component: EditTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
