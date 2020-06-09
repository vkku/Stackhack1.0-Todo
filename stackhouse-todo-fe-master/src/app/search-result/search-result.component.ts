import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task.model';
import {UserSignIn} from '../models/usersignin.model';
import {TaskService} from '../services/task.service';
import {AuthenticationService} from '../services/authentication.servcie';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  taskList: Task[] = [];
  user: UserSignIn;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    let title = this.route.snapshot.paramMap.get('title');
    this.taskService.searchTask(title,this.user.user._id).subscribe((taskList) => {
      this.taskList = taskList;
      console.log(this.taskList);
    });
  }
}
