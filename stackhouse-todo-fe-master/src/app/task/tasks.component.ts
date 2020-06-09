import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task.model';
import {AuthenticationService} from '../services/authentication.servcie';
import {UserSignIn} from '../models/usersignin.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [DatePipe],
})
export class TasksComponent implements OnInit {
  taskList: Task[];
  user: UserSignIn;

  constructor(
    private taskService: TaskService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.taskService.getTasks(this.user.user._id).subscribe((taskList) => {
      this.taskList = taskList;
      console.log(this.taskList);
    });
  }

  onEditTask(task: Task): void {
    this.router.navigateByUrl('/edit', { state: task });
  }

  onDeleteTask(task: Task, index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'common-delete-dialog-container',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.data) {
        this.taskService.deleteTask(task._id).subscribe(
          (data) => {
            this.taskList.splice(index, 1);
            this.alertService.success('Task Deleted Successfully.', true);
          },
          (error) => {
            this.alertService.error(error);
          },
        );
      }
    });
  }
}
