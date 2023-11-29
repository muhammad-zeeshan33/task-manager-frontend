import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';  

  taskForm: FormGroup = new FormGroup({});

  formInitializer() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  constructor(
    private _toasterService: ToastrService,
    private _taskService: TasksService,
    private _router: Router,
    private fb: FormBuilder
    ) {
      this.formInitializer();
    }

  onSubmit() {    
    if(this.taskForm.invalid) {
      return;
    }    
    this._taskService.addTask(this.taskForm.value).subscribe((res: any) => {
      if(res.success)  {
        this._toasterService.success('Task added successfully', 'Success');
        this._router.navigateByUrl('/tasks');
      }
    },
    (err: any) => {
      this._toasterService.error(err.error.message, 'Error');
    }
    )
  }
}
