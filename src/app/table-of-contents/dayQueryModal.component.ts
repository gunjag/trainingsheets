import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-query-modal',
  imports: [ MatDialogActions, MatFormFieldModule, MatDialogContent, MatInputModule, MatDialogModule ],
  template: `
    <h2 mat-dialog-title>Enter Day</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput #queryNameInput>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="onSubmit(queryNameInput.value)">Save</button>
    </mat-dialog-actions>
  `
})

export class DayQueryModalComponent {

  constructor(
    private dialogRef: MatDialogRef<DayQueryModalComponent>
  ) { }

  //readonly dialog = inject(MatDialog);
  onSubmit(queryName: string) {
    this.dialogRef.close(queryName);
  }
}