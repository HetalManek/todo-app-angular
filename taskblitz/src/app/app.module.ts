import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ** component imports
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AddTaskFormComponent } from './dashboard/children-components/add-task-form/add-task-form.component';
import { AllTaskComponent } from './dashboard/children-components/all-task/all-task.component';
import { TodayTaskComponent } from './dashboard/children-components/today-task/today-task.component';
import { UpcomingTaskComponent } from './dashboard/children-components/upcoming-task/upcoming-task.component';

// ** mui imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { TodoFormDialogComponent } from './components/shared/todo-form-dialog/todo-form-dialog.component';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AllTaskComponent,
    TodayTaskComponent,
    UpcomingTaskComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    TodoFormDialogComponent,
    AddTaskFormComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
