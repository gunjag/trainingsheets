import { Injectable } from '@angular/core';
import { ExerciseDay } from './data/ExerciseDay';
import { Sheet } from './data/Sheet';
import { EXERCISEDAYS } from './data/Mock-Data';
import { SHEETS } from './data/Mock-Data';
import { expand, Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private messageService: MessageService) { }

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
    this.messageService.add('DataService: Fetched Sheets from Mock-Data');
    return sheets;
  }
}

