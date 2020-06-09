import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserSignIn} from '../models/usersignin.model';
import {AlertService} from '../services/alert.service';
import {AuthenticationService} from '../services/authentication.servcie';

import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  loading = false;
  submitted = false;
  user: UserSignIn;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private alertService: AlertService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  currentDateTime = Date.now();
  createTaskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    text: ['', [Validators.required]],
    label: ['', [Validators.required]],
    status: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.createTaskForm.controls;
  }

  onTaskSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createTaskForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskService
      .createTask(
        this.createTaskForm.value,
        this.user.user._id,
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success(
            'Task Created Successfully.',
            true,
          );
          this.loading = false;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      );
  }
}
