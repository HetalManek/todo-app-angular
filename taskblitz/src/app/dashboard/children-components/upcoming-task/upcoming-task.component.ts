import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDoService } from 'src/app/core/services/to-do.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/core/models/todo.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-upcoming-task',
  templateUrl: './upcoming-task.component.html',
  styleUrls: ['./upcoming-task.component.scss'],
})
export class UpcomingTaskComponent {
  upcomingTasks: Todo[] = [];
  private upcomingTasksSubscription!: Subscription;
  private getDataSubscription!: Subscription;
  private deleteTaskSubscription!: Subscription;

  constructor(
    private todoService: ToDoService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.upcomingTasksSubscription = this.todoService.upcomingTasks$.subscribe(
      (tasks) => {
        this.upcomingTasks = tasks;
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
      this.upcomingTasks = this.upcomingTasks.filter((t) => t.id !== task.id);
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
  openTodoForm(task) {
    this.todoService.emitEditButtonClick(task);
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
    if (this.upcomingTasksSubscription) {
      this.upcomingTasksSubscription.unsubscribe();
    }
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
  }
}
