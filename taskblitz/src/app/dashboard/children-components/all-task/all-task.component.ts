import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/core/models/todo.model';
import { ToDoService } from 'src/app/core/services/to-do.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { TodoFormDialogComponent } from 'src/app/components/shared/todo-form-dialog/todo-form-dialog.component';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
})
export class AllTaskComponent implements OnInit {
  tasks: Todo[] = [];
  @Output() editButtonClick: EventEmitter<void> = new EventEmitter<void>();
  isPopupOpen: boolean = false;
  private getDataSubscription!: Subscription;
  private deleteTaskSubscription!: Subscription;
  private getTasklistSubscription!: Subscription;

  constructor(
    private todoService: ToDoService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.getDataSubscription = this.todoService.getData$.subscribe(() => {
      this.loadTasks();
    });
  }

  // complete task
  onCheckboxChange(task) {
    task.completed = !task.completed;
    if (task.completed) {
      // Remove the task from the list if it's completed
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
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

  openTodoForm(task: Todo): void {
    const dialogRef = this.dialog.open(TodoFormDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: { task }, // Pass the task data to the edit task dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadTasks(); // Reload tasks if the task was edited successfully
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
          this.loadTasks();
        });
      }
    });
  }

  //view all task
  loadTasks() {
    this.getTasklistSubscription = this.todoService
      .getTasklist()
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the getData$ observable to prevent memory leaks
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }

    // Unsubscribe from the deleteTask observable if it is defined
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }

    // Unsubscribe from the getTasklist observable if it is defined
    if (this.getTasklistSubscription) {
      this.getTasklistSubscription.unsubscribe();
    }
  }
}
