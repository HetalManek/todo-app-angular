// ** angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ** component imports
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: "login",
    loadChildren: () =>
      import("../app/components/pages/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("../app/components/pages/signup/signup.module").then(
        (m) => m.SignupModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        '../app/components/pages/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import(
        '../app/components/pages/profile/profile.module'
      ).then((m) => m.ProfileModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
