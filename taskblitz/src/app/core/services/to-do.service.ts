import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private taskApiUrl = 'http://localhost:3000/tasks';

  private getUpdatedData = new BehaviorSubject<Todo[]>([]);
  getData$ = this.getUpdatedData.asObservable();

  private allTasksSubject = new BehaviorSubject<Todo[]>([]);
  allTasks$ = this.allTasksSubject.asObservable();

  private todayTasksSubject = new BehaviorSubject<Todo[]>([]);
  todayTasks$ = this.todayTasksSubject.asObservable();

  private upcomingTasksSubject = new BehaviorSubject<Todo[]>([]);
  upcomingTasks$ = this.upcomingTasksSubject.asObservable();

  editButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  emitEditButtonClick(task: any) {
    this.editButtonClick.emit(task);
  }

  getTasklist(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.taskApiUrl);
  }

  fetchTasks() {
    this.getTasklist().subscribe((tasks) => {
      this.allTasksSubject.next(tasks); // Update all tasks

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      });
      this.todayTasksSubject.next(todayTasks); // Update today's tasks

      const upcomingTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate > today;
      });
      this.upcomingTasksSubject.next(upcomingTasks); // Update upcoming tasks
    });
  }

  createTask(task: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.taskApiUrl, task);
  }

  updateTask(taskId: string, updatedTaskData: Todo): Observable<Todo> {
    const updateUrl = `${this.taskApiUrl}/${taskId}`;
    return this.http.put<Todo>(updateUrl, updatedTaskData);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.taskApiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateApiCall(data: any) {
    this.getUpdatedData.next(data);
  }
}
