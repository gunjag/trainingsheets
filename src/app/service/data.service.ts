import { Injectable } from '@angular/core';
import { ExerciseDay } from '../model/ExerciseDay';
import { Sheet } from '../model/Sheet';
import { EXERCISEDAYS } from '../model/Mock-Data';
import { SHEETS } from '../model/Mock-Data';
import { BehaviorSubject, expand, Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { ActiveService } from './active-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentSheet = new BehaviorSubject<Sheet|null>(null);
  public currentDate = new BehaviorSubject<ExerciseDay|null>(null);
  private allSheets: Sheet[] = [];
  private allExerciseDays: ExerciseDay[] = [];
  constructor(private messageService: MessageService, private activeService: ActiveService) { }

  fillDataFromMockData() {
    this.putAllExerciseDays(EXERCISEDAYS);
    this.putAllSheets(SHEETS);
  }

  getAllExerciseDays(): Observable<ExerciseDay[]> {
    this.messageService.add('DataService: Fetched ExerciseDays from Mock-Data');
    var exerciseDays: Observable<ExerciseDay[]>;
    exerciseDays = of(this.allExerciseDays);
    return exerciseDays;
  }

  getExerciseDay(id: number): Observable<ExerciseDay> {
    const exerciseDay = EXERCISEDAYS.find(ex => ex.id === id)!;
    return of(exerciseDay);
  }

  putAllExerciseDays(s: ExerciseDay[]) {
    this.allExerciseDays = s;
  }

  putAllSheets(s: Sheet[]) {
    this.allSheets = s;
  }

  getAllSheets(): Observable<Sheet[]> {
    var sheets: Observable<Sheet[]>;
    sheets = of(this.allSheets);
    return sheets;
  }
  getAllSheetsNotObserved(): Sheet[] {
    return this.allSheets;
  }
  getSheet(shortName: string): Observable<Sheet> {
    const sheet = this.allSheets.find(sh => sh.shortName === shortName)!;
    return of(sheet);
  }
  editSheet(selSheet: Sheet) {
    console.log("Save...", this.activeService.currentSheet);
    if(!(selSheet===null)) {
      const index = SHEETS.findIndex(sh => sh.id === selSheet.id);
      //SHEETS[index] = { ...selSheet };
      (this.allSheets[index]).shortName = selSheet.shortName;
      (this.allSheets[index]).htmlBody = selSheet.htmlBody;
      (this.allSheets[index]).note = selSheet.note;

    }
  }

  editExperciseDay(editId: number) {
    console.log("Save...", this.activeService.currentDate);
    const selExDay = this.activeService.currentDate;
    if(!(selExDay===null)) {
      const index = EXERCISEDAYS.findIndex(sh => sh.id === editId);
      (EXERCISEDAYS[index]).date = (selExDay.value as ExerciseDay).date as Date;
    }
  }

  getNextSheetId(): number {
    var highest: number = 0;
    this.allSheets.forEach(sheet => {
      if ((sheet.id != null) && (sheet.id > highest)) { highest = sheet.id };
    });
    return highest + 1;
  }

  getNextExerciseDayId(): number {
    var highest: number = 0;
    EXERCISEDAYS.forEach(day => {
      if ((day.id != null) && (day.id > highest)) { highest = day.id };
    });
    return highest + 1;
  }
}

