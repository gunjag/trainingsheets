import { Sheet } from "./Sheet";
import { ExerciseDay } from "./ExerciseDay";

const s1: Sheet = {
    shortName: 'Sheet 11',
    htmlBody: '<body>Sheet1</body>',
    note: 'note text 1'
};

const s2: Sheet = {
    shortName: 'Sheet 22',
    htmlBody: '<body>Sheet2</body>',
    note: 'note text 2'
};

const s3: Sheet = {
    shortName: 'Sheet 22',
    htmlBody: '<body>Sheet3</body>',
    note: 'note text 3'
};

const e1: ExerciseDay = {
    id: 1,
    label: "Montag",
    date: new Date,
    sheets: [s1, s2]
};

const e2: ExerciseDay = {
    id: 2,
    label: "Dienstag",
    date: new Date(2023,0,30,0,5,0,0),
    sheets: [s3]
};

export const EXERCISEDAYS: ExerciseDay [] = [e1, e2];
export const SHEETS: Sheet [] = [s1, s2, s3];

