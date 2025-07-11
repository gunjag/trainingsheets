import { Injectable } from '@angular/core';
import { ExerciseDay } from '../data/ExerciseDay';
import { Sheet } from '../data/Sheet';
import { EXERCISEDAYS } from '../data/Mock-Data';
import { SHEETS } from '../data/Mock-Data';
import { BehaviorSubject, expand, Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { ActiveService } from './active-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentSheet = new BehaviorSubject<Sheet|null>(null);
  public currentDate = new BehaviorSubject<ExerciseDay|null>(null);
  constructor(private messageService: MessageService, private activeService: ActiveService) { }

  getExerciseDays(): Observable<ExerciseDay[]> {
    const exerciseDays = of(EXERCISEDAYS);
    this.messageService.add('DataService: Fetched ExerciseDays from Mock-Data');
    return exerciseDays;
  }
  getExerciseDay(id: number): Observable<ExerciseDay> {
    const exerciseDay = EXERCISEDAYS.find(ex => ex.id === id)!;
    return of(exerciseDay);
  }
  getSheets(): Observable<Sheet[]> {
    const sheets = of(SHEETS);
    return sheets;
  }
  getSheetsNotObserved(): Sheet[] {
    return SHEETS;
  }
  getSheet(shortName: string): Observable<Sheet> {
    const sheet = SHEETS.find(sh => sh.shortName === shortName)!;
    return of(sheet);
  }
  editSheet(selSheet: Sheet) {
    console.log("Save...", this.activeService.currentSheet);
    if(!(selSheet===null)) {
      const index = SHEETS.findIndex(sh => sh.id === selSheet.id);
      //SHEETS[index] = { ...selSheet };
      (SHEETS[index]).shortName = selSheet.shortName;
      (SHEETS[index]).htmlBody = selSheet.htmlBody;
      (SHEETS[index]).note = selSheet.note;

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
    SHEETS.forEach(sheet => {
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

