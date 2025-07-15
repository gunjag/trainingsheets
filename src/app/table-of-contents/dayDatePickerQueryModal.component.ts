import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-query-modal',
    imports: [ MatDialogActions, MatDatepickerToggle, MatFormFieldModule, MatDialogContent, MatInputModule, MatDatepickerModule, MatDatepicker, MatDatepickerToggle, MatDatepickerInput, MatNativeDateModule, MatDialogModule, FormsModule ],
    templateUrl: './dayDatePickerQueryModal.component.html',
    styleUrls: ['./dayDatePickerQueryModal.component.css'],
    providers: [ { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }]
})

export class DayDatePickerQueryModalComponent {
  selectedDate: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<DayDatePickerQueryModalComponent>
  ) { }

  //readonly dialog = inject(MatDialog);
  onSubmit(queryDate?: Date) {
    this.dialogRef.close(queryDate);
  }
}