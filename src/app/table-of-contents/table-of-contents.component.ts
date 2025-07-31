import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../service/data.service';
import { ExerciseDay } from '../data/ExerciseDay';
import { Sheet } from '../data/Sheet';
import { SheetDetailComponent } from '../sheetDetail.component';
import { NEVER, Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs";
import { ActiveService } from '../service/active-service';
import { SHEETS } from '../data/Mock-Data';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DayQueryModalComponent } from './dayQueryModal.component';
import { DayDatePickerQueryModalComponent } from './dayDatePickerQueryModal.component';
import { FormsModule } from '@angular/forms';
import { SheetQueryModalComponent } from './searchSheetQueryModal.component';
import { MatListModule, MatListItem, MatListItemIcon } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-table-of-contents',
  imports: [ CommonModule, RouterModule, FormsModule, NgFor, SheetDetailComponent, MatListModule, MatIconModule, MatButtonModule, MatCardModule ],  
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css',
  providers: [ { provide: MatDialogRef,useValue: {} } ]
})

export class TableOfContentsComponent {

  exerciseDays: ExerciseDay[] = [];
  sheets: Sheet[] = [];
  readonly dialog = inject(MatDialog);
  activeSheet: Sheet = new Sheet();
  activeExerciseDay: ExerciseDay = new ExerciseDay;
  showTOC: boolean = false;
     
  constructor(private dialogRef: MatDialogRef<TableOfContentsComponent>, private dataService: DataService, public activeService: ActiveService) {
  }

  ngOnInit(): void {
    this.getExerciseDays();
    this.getSheets();
    this.showFirstDay();
  }

  showFirstDay() {
    let firstDay = null;
    if(this.exerciseDays.length > 0) firstDay = this.exerciseDays[0];
    if(firstDay != null) {
      this.activeService.currentDate.next(firstDay);
      this.selectDate(firstDay);
    }
  }

  getExerciseDays(): void {
    this.dataService.getExerciseDays().subscribe(exerciseDays => this.exerciseDays = exerciseDays);
    this.sortExerciseDays();
  }

  sortExerciseDays(): void {
    this.exerciseDays = this.exerciseDays.sort((a, b) => (a.sort(b)));
  }

  getSheets(): Sheet[] {
    this.dataService.getSheets().subscribe(sheets => this.sheets = sheets);
    this.sheets = this.sheets.sort(function(a, b) { return a.shortName.localeCompare(b.shortName)});
    return this.sheets;
  }
  
  selectDate(arg: ExerciseDay): void {
    console.log("clicked", arg);
    this.activeService.currentDate.next(arg);
    this.activeExerciseDay = arg;
    this.activeSheet = new Sheet();
    this.showTOC = false;
    this.showSheets(arg);
  }
  selectSheet(arg: Sheet): void {
    console.log("clicked", arg);
    this.activeSheet = arg;
  }

  showSheets(exDay: ExerciseDay) {
    //this.sheets = (exDay.sheets as Sheet[]).sort((a, b) => -1 * a.shortName.localeCompare(b.shortName));
    this.sheets = (exDay.sheets as Sheet[]).sort(function(a, b) { return a.shortName.localeCompare(b.shortName)});
  }

  showSheetsTOC() {
    this.activeExerciseDay = new ExerciseDay();
    this.getSheets();
  }

  clickedNewSheetButton() {
    console.log("clicked new sheet", this.activeService.currentSheet);
    const newSheet: Sheet = new Sheet(this.dataService.getNextSheetId());
    this.sheets.push(newSheet);
    this.activeSheet = newSheet;
  }

  clickedAddSheetButton() {
    if(this.showTOC) return;
    console.log("clicked add sheet");
    this.openSheetQueryModal()
  }

  clickedDeleteSheetButton() {
    if(this.activeSheet === null) return;
    console.log(this.activeSheet.id);
    if(this.showTOC) {
      // Delete in TOC
      const sheetIndex = this.sheets.findIndex(x => x.id === this.activeSheet.id);
      for(var exDay of this.exerciseDays) {
        var daySheets = exDay.sheets as Array<Sheet>;
        var sheetInDayIndex = daySheets.findIndex(x => x.id === this.activeSheet.id);
          if(sheetInDayIndex as number > 0) {
            console.log("found index",sheetInDayIndex);
            daySheets?.splice(sheetInDayIndex, 1);
          }
      }
      this.sheets?.splice(sheetIndex, 1);
    } else {
      // Remove from ExerciseDay
      let selExDay: ExerciseDay = this.activeService.currentDate.value as ExerciseDay;
      let list = selExDay.sheets as Sheet[];
      const index = list.findIndex(x => x.id === this.activeSheet.id);
      selExDay.sheets?.splice(index, 1);
    };
    
  }

  clickedNewExerciseButton() {
    console.log("clicked new day", this.activeService.currentDate);
    const newDay: ExerciseDay = new ExerciseDay(this.dataService.getNextExerciseDayId(), new Date, []);
    this.exerciseDays.push(newDay);
    this.activeService.currentDate.next(newDay);
    this.openDayQueryModal();
    this.selectDate(newDay);
  }

  clickedEditExerciseButton() {
    this.openDayQueryModal()
  }


  clickedDeleteExerciseButton() {
    if(this.activeExerciseDay === null) return;
    //let selExDay: ExerciseDay = this.activeService.currentDate.value as ExerciseDay;
    let list = this.exerciseDays;
    const index = list.findIndex(x => x.id === this.activeExerciseDay.id);
    list.splice(index, 1);
    this.sheets = new Array;
  }

  async openDayQueryModal(): Promise<Date | undefined> {
    if(this.activeService.currentDate.value != null) {
      var selExDayId = (this.activeService.currentDate.value as ExerciseDay).id as number;
    } else {
      return undefined;
    }

    //Open Search dialog
    const dialogRef = this.dialog.open(DayDatePickerQueryModalComponent, {
      width: '400px'
    });
  
    const resultDate = await dialogRef.afterClosed().toPromise() as Date;
    console.log(resultDate);
    
  //Work on with day in resultString
    //var day = this.makeDate(resultString);
    if(resultDate === undefined) {
      return undefined
    } else {
      this.activeService.currentDate.value.date = resultDate;
      this.sortExerciseDays();
      this.dataService.editExperciseDay(selExDayId);
      return resultDate;
    }
  }

  async openSheetQueryModal() {
    if(this.activeService.currentDate.value != null) {
      var selExDay: ExerciseDay = this.activeService.currentDate.value as ExerciseDay;
    } else {
      return
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.data = this.dataService.getSheetsNotObserved();
    const dialogRef = this.dialog.open(SheetQueryModalComponent, dialogConfig);

    const resultSheet = await dialogRef.afterClosed().toPromise();
    console.log(resultSheet);
    if(resultSheet != null) {
      selExDay.sheets?.push(resultSheet);
      console.log("...added");
    }
  }

  makeDate(dateString: string): Date | undefined {
    //formatDate(Date.now(),'yyyy-MM-dd','en-US');
    if(dateString === undefined) return undefined;
    let temp: number[] = dateString.split('.').map(Number);
    if(temp.length != 3) return undefined;
    return new Date(Date.UTC(temp[2], temp[1] - 1, temp[0]));
  }

  openSheetListOneDay() {
    console.log("Pressed One Day", this.activeExerciseDay)
    // if(this.showTOC) this.showTOC = false;
    // this.showSheets(this.activeExerciseDay);
  }

  openSheetListTOC() {
    console.log("Pressed TOC", this.activeExerciseDay)
    if(!this.showTOC) this.showTOC = true;
    this.showSheetsTOC();
  }

  clickedAdminButton() {
    if(this.isAdmin) {
      this.activeService.isAdmin = false;
      this.showFirstDay();
    } else {
      this.activeService.isAdmin = true;
    }        
  }

  get isAdmin() {
    return this.activeService.isAdmin;
  }

  get showSheetList() {
    return (this.showTOC && this.isAdmin) || !this.showTOC;
  }
}
