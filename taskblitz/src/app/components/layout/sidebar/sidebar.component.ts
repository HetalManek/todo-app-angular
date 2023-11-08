import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Todo } from 'src/app/core/models/todo.model';
import { AuthService } from '../../../core/services/auth.service';
import { TodoFormDialogComponent } from '../../shared/todo-form-dialog/todo-form-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  formData: Todo | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  openAddTaskDialog(){
    const dialogRef = this.dialog.open(TodoFormDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: {},
    });
   
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
