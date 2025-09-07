import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { UtentiComponent } from './public/utenti/utenti.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // home pubblica
  { path: 'utenti', component: UtentiComponent },
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
