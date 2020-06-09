import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {appRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SignupComponent} from './signup/signup.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {AlertComponent} from './alert/alert.component';
import {TasksComponent} from './task/tasks.component';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ArchiveTaskComponent} from './archieve-task/archive-task.component';
import {MatInputModule} from '@angular/material/input';
import {SearchResultComponent} from './search-result/search-result.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthGuard} from "./helpers/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreateTaskComponent,
    AlertComponent,
    TasksComponent,
    ArchiveTaskComponent,
    SearchResultComponent,
    EditTaskComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent],
})
export class AppModule {}
