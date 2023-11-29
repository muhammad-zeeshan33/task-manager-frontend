import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  taskId: number = 0;
  task: any = {};
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
    private _route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.formInitializer();
    }
    


  getTaskById() {    
    const id = this._route.snapshot.paramMap.get('id');            
    this._taskService.getTaskById(id).subscribe((res: any) => {
      if(res.success) {
        this.taskForm.patchValue({
          title: res.data.title,
          description: res.data.description
        });
        this.taskId = res.data.id;
        this.task = res.data;
        
      }else{
        this._toasterService.error(res.message, 'Error');
      }
    });
  }


  onSubmit() {
    if(this.taskForm.invalid) {
      return;
    }

    if(this.task.title === this.taskForm.value.title && this.task.description === this.taskForm.value.description) {
      this._toasterService.error('No changes made', 'Error');
      return;
    }

    const task = {
      id: this.taskId,
      ...this.taskForm.value
    };    
    
    this._taskService.updateTask(task).subscribe((res: any) => {
      if(res.success)  {
        this._toasterService.success('Task updated successfully', 'Success');
        this._router.navigateByUrl('/tasks');
      }
    },
    (err: any) => {
      this._toasterService.error(err.error.message, 'Error');
    }
    );
  }

  ngOnInit(): void {
    this.getTaskById();
  }
}
