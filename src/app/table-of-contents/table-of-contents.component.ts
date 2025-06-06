import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../data.service';
import { ExerciseDay } from '../data/ExerciseDay';
import { Sheet } from '../data/Sheet';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table-of-contents',
  imports: [ CommonModule, RouterModule ],  
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css'
})

export class TableOfContentsComponent {

  exerciseDays: ExerciseDay[] = [];
  sheets: Sheet[] = [];
  selectedDay?: ExerciseDay;
  selectedSheet?: Sheet;

  constructor(
    private dataService: DataService) {
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
}
