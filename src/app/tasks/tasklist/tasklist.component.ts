import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  tasks: any[] = []    

  constructor(private _taskService: TasksService,
    private _toasterService: ToastrService) {}
 
  deleteTask(task: any) { 
    this._taskService.deleteTask(task.id).subscribe((res: any) => {
      if(res.success) {
        this._toasterService.success('Task deleted successfully', 'Success');
        setTimeout(() => {
          this.getTasks();
        }, 500);        
      }
    });    
  }

  getTasks() {
    this._taskService.getTasks().subscribe((res: any) => {
      this.tasks = res.data;
    },
    (err: any) => {
      this._toasterService.error(err.error.message, 'Error');
    }
    );
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
