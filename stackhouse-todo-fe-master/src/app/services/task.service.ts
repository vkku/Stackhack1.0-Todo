import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Task} from '../models/task.model';
import {API} from '../app.constants';
import {Observable} from 'rxjs';
import {UserSignIn} from '../models/usersignin.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  user: UserSignIn;
  constructor(private http: HttpClient) {}

  getTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(environment.API_URL + API.SHOW_TASK + userId);
  }

  createTask(task: Task, userId: string) {
    return this.http.post(environment.API_URL + API.CREATE_TASK + userId, task);
  }

  updateTask(task: Task, taskId: string) {
    return this.http.put(environment.API_URL + API.UPDATE_TASK + taskId, task);
  }

  getArchiveTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      environment.API_URL + API.ARCHIVE_TASK + userId,
    );
  }
  deleteTask(taskId: string) {
    return this.http.delete(environment.API_URL + API.DELETE_TASK + taskId);
  }
  searchTask(title: string, userId: string) {
    return this.http.get<Task[]>(
      environment.API_URL + API.SEARCH_TASK + userId + '/' + title,
    );
  }
}
