import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtentiComponent } from './utenti/utenti.component';
import { AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],   // protezione area admin
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'utenti', component: UtentiComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // default -> dashboard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
