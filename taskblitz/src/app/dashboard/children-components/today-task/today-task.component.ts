import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { TodoFormDialogComponent } from 'src/app/components/shared/todo-form-dialog/todo-form-dialog.component';
import { Todo } from 'src/app/core/models/todo.model';
import { ToDoService } from 'src/app/core/services/to-do.service';

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['./today-task.component.scss'],
})
export class TodayTaskComponent {
  todayTasks: Todo[] = [];
  private todayTasksSubscription!: Subscription;
  private getDataSubscription!: Subscription;
  private deleteTaskSubscription!: Subscription;

  constructor(
    private todoService: ToDoService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.todayTasksSubscription = this.todoService.todayTasks$.subscribe(
      (todayTasks) => {
        this.todayTasks = todayTasks;
      }
    );
    this.getDataSubscription = this.todoService.getData$.subscribe(() => {
      this.todoService.fetchTasks();
    });
  }

  // complete task
  onCheckboxChange(task) {
    task.completed = !task.completed;
    if (task.completed) {
      // Remove the task from the list if it's completed
      this.todayTasks = this.todayTasks.filter((t) => t.id !== task.id);
      this.deleteTaskSubscription = this.todoService
        .deleteTask(task.id)
        .subscribe(() => {
          this.toastr.success(
            'You have completed task your successfully!!.',
            'Good job'
          );
        });
    }
  }

  //open pop up at edit time
  openTodoForm(task: Todo) {
    const dialogRef = this.dialog.open(TodoFormDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: { task }, // Pass the task data to the edit task dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.todoService.fetchTasks();// Reload tasks if the task was edited successfully
      }
    });
  }

  //delete task
  deleteTask(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px'; // Set the width of the dialog
    dialogConfig.position = { top: '20px', right: '20px' };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this task?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, delete the task
        this.todoService.deleteTask(id).subscribe(() => {
          this.toastr.success('You have deleted the task successfully!!.');
          this.todoService.fetchTasks();
        });
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to prevent memory leaks
    if (this.todayTasksSubscription) {
      this.todayTasksSubscription.unsubscribe();
    }
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
  }
}
