import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AllTaskComponent } from './children-components/all-task/all-task.component';
import { TodayTaskComponent } from './children-components/today-task/today-task.component';
import { UpcomingTaskComponent } from './children-components/upcoming-task/upcoming-task.component';
import { AddTaskFormComponent } from './children-components/add-task-form/add-task-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'add-task', component: AddTaskFormComponent },
      { path: 'all-task', component: AllTaskComponent },
      { path: 'today-task', component: TodayTaskComponent },
      { path: 'upcoming-task', component: UpcomingTaskComponent },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class DashboardModule {}
