import { Sheet } from "./Sheet";
import { ExerciseDay } from "./ExerciseDay";

const s1: Sheet = {
    id: 1,
    shortName: 'Sheet 11',
    htmlBody: '<body>Sheet1</body>',
    note: 'note text 1'
};

const s2: Sheet = {
    id: 2,
    shortName: 'Sheet 22',
    htmlBody: '<body>Sheet2</body>',
    note: 'note text 2'
};

const s3: Sheet = {
    id: 3,
    shortName: 'Sheet 22',
    htmlBody: '<body>Sheet3</body>',
    note: 'note text 3'
};

const e1 = new ExerciseDay (
    1,
    new Date,
    [s1, s2]
);

const e2 = new ExerciseDay (
    2,
    new Date(2023,0,30,0,5,0,0),
    [s3]
);

export const EXERCISEDAYS: ExerciseDay [] = [e1, e2];
export const SHEETS: Sheet [] = [s1, s2, s3];

