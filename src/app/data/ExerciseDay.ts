import { Sheet } from "./Sheet";

export class ExerciseDay {
    id?: number;
    date?: Date;
    sheets?: Sheet[];

    constructor(id?: number, date?: Date, sheets?: Sheet[]) {
        this.id = id;
        this.date = date;
        this.sheets = sheets;
    }

    public deleteFromArray(dayArray: ExerciseDay[]) {
        const index = dayArray.findIndex(x => x.id === this.id);
        dayArray.splice(index, 1);
    }
}

