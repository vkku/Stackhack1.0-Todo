import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserSignIn} from '../models/usersignin.model';
import {AuthenticationService} from '../services/authentication.servcie';

import {AlertService} from '../services/alert.service';
import {TaskService} from '../services/task.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  loading = false;
  submitted = false;
  user: UserSignIn;
  task: Task = window.history.state;
  taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    text: ['', [Validators.required]],
    label: ['', [Validators.required]],
    status: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.taskForm.patchValue({
      title: this.task.title,
      text: this.task.text,
      label: this.task.label,
      status: this.task.status,
      dueDate: new Date(this.task.dueDate).toISOString().slice(0, 16),
    });
    // console.log(window.history.state);
    // this.activatedRoute.paramMap.pipe(
    //   map(() => {
    //     this.task = window.history.state;
    //     console.log(this.task);
    //
    //   }),
    // );
  }

  get f() {
    return this.taskForm.controls;
  }

  onUpdateTaskSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskService
      .updateTask(this.taskForm.value, this.task._id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Task Updated Successfully.', true);
          this.loading = false;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      );
  }
}
