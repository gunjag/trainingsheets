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

    public sort(other: ExerciseDay): number {
        if(other === undefined) return 1;
        let dateA = this.date as Date;
        let dateB = other.date as Date;
        return (dateA.toISOString() as string) < (dateB.toISOString() as string) ? -1 : 1;
    }
}

