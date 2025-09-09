import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { UtentiComponent } from './public/utenti/utenti.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // home pubblica
  { path: 'utenti', component: UtentiComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module')
      .then(m => m.AdminRoutingModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
