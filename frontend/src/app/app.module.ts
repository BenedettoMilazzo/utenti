import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { UtentiComponent } from './public/utenti/utenti.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { FooterComponent } from './public/footer/footer.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarAdminComponent } from './admin/components/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './admin/components/footer-admin/footer-admin.component';

import { LayoutComponent } from './admin/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './admin/pages/users/users.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AddUserComponent } from './admin/pages/users/add-user/add-user.component';
import { EditUserComponent } from './admin/pages/users/edit-user/edit-user.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UtentiComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    UsersComponent,  
    LayoutComponent, AddUserComponent, EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // necessario
    ToastrModule.forRoot({ positionClass: 'toast-top-right' }), // posizione e opzioni
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
