import {RouterModule, Routes} from '@angular/router';
// import { HomeComponent } from './home';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {TasksComponent} from './task/tasks.component';
import {ArchiveTaskComponent} from './archieve-task/archive-task.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {AuthGuard} from './helpers/auth.guard';
import {SearchResultComponent} from "./search-result/search-result.component";
// import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'home', component: TasksComponent, canActivate: [AuthGuard] },
  {
    path: 'archived',
    component: ArchiveTaskComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search/:title', component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditTaskComponent, canActivate: [AuthGuard] },

  //  otherwise redirect to signin
  { path: '**', redirectTo: '/signin', pathMatch: 'full' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
