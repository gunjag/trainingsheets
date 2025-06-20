import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../service/data.service';
import { ExerciseDay } from '../data/ExerciseDay';
import { Sheet } from '../data/Sheet';
import { SheetDetailComponent } from '../sheetDetail.component';
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs";
import { ActiveService } from '../service/active-service';


@Component({
  selector: 'app-table-of-contents',
  imports: [ CommonModule, RouterModule, SheetDetailComponent ],  
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css'
})

export class TableOfContentsComponent {

  exerciseDays: ExerciseDay[] = [];
  sheets: Sheet[] = [];
  selectedDay?: ExerciseDay;
  selectedSheet?: Sheet;
  editMode: boolean = false;
  
  constructor(private dataService: DataService, private activeService: ActiveService) {
  }

  ngOnInit(): void {
    this.getExerciseDays();
    this.getSheets();
  }

  getExerciseDays(): void {
    this.dataService.getExerciseDays().subscribe(exerciseDays => this.exerciseDays = exerciseDays);
  }
  getSheets(): void {
    this.dataService.getSheets().subscribe(sheets => this.sheets = sheets);
  }
  selectDate(arg: ExerciseDay): void {
    console.log("clicked", arg)
    this.activeService.currentDate.next(arg)
  }
  selectSheet(arg: Sheet): void {
    console.log("clicked", arg)
    this.activeService.currentSheet.next(arg)
    this.selectedSheet = arg;
  }

  clickedNewSheetButton() {
    console.log("clicked new sheet", this.selectedSheet);
  }
  clickedAddSheetButton() {
    console.log("clicked add sheet", this.selectedSheet);
  }
}
