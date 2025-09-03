import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Sheet } from '../model/Sheet';

@Component({
    selector: 'app-query-modal',
    templateUrl: './searchSheetQueryModal.component.html',
    styleUrl: './searchSheetQueryModal.component.css',
    imports: [ MatFormFieldModule, MatInputModule, MatDialogModule, NgFor ],
})

export class SheetQueryModalComponent implements OnInit {

    selectedSheet: Sheet | null = null;
    sheetList: Sheet[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<SheetQueryModalComponent>
    ) {
        this.sheetList = data;
    }

    ngOnInit(): void {
        console.log("liste: ", this.sheetList);
    }

    //readonly dialog = inject(MatDialog);
    onSubmit(sheet: Sheet) {
        this.dialogRef.close(sheet);
    }

    search(searchString: string) {
        console.log("search for ", searchString);

    }

    selectSheet(arg: Sheet): void {
        console.log("clicked", arg);
        this.selectedSheet = arg;
    }

    clickedAddSheetButton() {
        if (this.selectedSheet != null) {
            console.log("add: ", this.selectedSheet);
            this.dialogRef.close(this.selectedSheet);
        }
    }
}