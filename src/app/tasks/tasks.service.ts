import { Injectable } from '@angular/core';
import { GenericHttpService } from '../services/http/http.service';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: GenericHttpService) {}
  

  getTasks() {
    return this.httpClient.get('/tasks');
  }

  addTask(task: any) {
    return this.httpClient.post('/tasks', task);
  }

  deleteTask(id: any) {
    return this.httpClient.delete(`/tasks/${id}`);
  }

  updateTask(task: any) {
    return this.httpClient.post(`/tasks/${task.id}`, task);
  }

  getTaskById(id: any) {
    return this.httpClient.get(`/tasks/${id}`);
  }
  
}
