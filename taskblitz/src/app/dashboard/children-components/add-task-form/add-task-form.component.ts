import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ToDoService } from 'src/app/core/services/to-do.service';
import { Todo } from '../../../core/models/todo.model';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  @Input() receiveData: Todo | undefined;
  @Output() onCancel = new EventEmitter<void>();

  todoForm!: FormGroup;
  submitted = false;
  minDate; 
  private apiCallSubscription!: Subscription;
  private updateTaskSubscription!: Subscription;

  constructor(
    public todoService: ToDoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.minDate = this.getCurrentDate();
    this.todoService.getTasklist();
    this.todoForm = this.fb.group({
      title: [
        this.receiveData ? this.receiveData.title : '',
        [Validators.required],
      ],
      description: [
        this.receiveData ? this.receiveData.description : '',
        [Validators.required],
      ],
      dueDate: [
        this.receiveData ? this.receiveData.dueDate : '',
        [Validators.required],
      ],
    });

    if (this.receiveData) {
      this.todoForm.patchValue({
        title: this.receiveData.title,
        description: this.receiveData.description,
        dueDate: this.receiveData.dueDate,
      });
    }
  }

  get f() {
    return this.todoForm.controls;
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    // Format the date as 'YYYY-MM-DD'
    return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      if (this.receiveData) {
        // If there is task data, update the task
        this.apiCallSubscription = this.todoService
          .updateTask(this.receiveData.id.toString(), formData)
          .subscribe(() => {
            this.toastr.success('You have updated your task successfully!!.');
            this.closeTodoForm(); // Close the form after successful update
            this.todoService.updateApiCall(true);
          });
      } else {
        // If there is no task data, create a new task
        this.updateTaskSubscription = this.todoService
          .createTask(formData)
          .subscribe(() => {
            this.toastr.success(
              'You have added your task successfully!!.',
              'Great'
            );
            this.closeTodoForm(); // Close the form after successful creation
            this.todoService.updateApiCall(true);
            this.router.navigate(['/dashboard/all-task']);
          });
      }
    }
  }

  closeTodoForm() {
    this.onCancel.emit();
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.apiCallSubscription) {
      this.apiCallSubscription.unsubscribe();
    }
    if (this.updateTaskSubscription) {
      this.updateTaskSubscription.unsubscribe();
    }
  }
}
