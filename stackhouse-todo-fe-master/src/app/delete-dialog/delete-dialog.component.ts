import {Component, OnInit, Optional} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
      @Optional() public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) {

  }

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close({ event: 'close', data: true });
  }

}
