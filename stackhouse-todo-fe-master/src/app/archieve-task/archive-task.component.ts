import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task.model';
import {UserSignIn} from '../models/usersignin.model';
import {TaskService} from '../services/task.service';
import {AuthenticationService} from '../services/authentication.servcie';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task.component.html',
  styleUrls: ['./archive-task.component.scss'],
})
export class ArchiveTaskComponent implements OnInit {
  taskList: Task[];
  user: UserSignIn;

  constructor(
    private taskService: TaskService,
    private authenticationService: AuthenticationService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.taskService.getArchiveTasks(this.user.user._id).subscribe((taskList) => {
      this.taskList = taskList;
      console.log(this.taskList);
    });
  }
}
