import { ExerciseDay } from "./ExerciseDay";

export class DateList {
    public list: ExerciseDay[] = [];
    public selectedDate?: ExerciseDay;

    public getExerciseDays(): ExerciseDay[] {
        return this.list;
    }
 
}