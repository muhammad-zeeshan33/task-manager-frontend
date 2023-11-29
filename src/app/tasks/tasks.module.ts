import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
@NgModule({  
  declarations: [TasksComponent, TasklistComponent, AddTaskComponent, EditTaskComponent],
  imports: [CommonModule, TasksRoutingModule, FormsModule, RouterModule, SharedModule],
})
export class TasksModule {}
