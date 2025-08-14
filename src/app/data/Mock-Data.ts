import { Sheet } from "./Sheet";
import { ExerciseDay } from "./ExerciseDay";

var header: string;
var pic: string;
var note: string;
var htmlText: string;
var htmlBody: string;

const c: Sheet = {
    id: 4,
    shortName: 'c',
    htmlBody: '',
    note: ''
};

const a: Sheet = {
    id: 5,
    shortName: 'a',
    htmlBody: '',
    note: ''
};

const b: Sheet = {
    id: 6,
    shortName: 'b',
    htmlBody: '',
    note: ''
};

const s1: Sheet = {
    id: 1,
    shortName: 'Sheet a11',
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
    shortName: 'Sheet 22a',
    htmlBody: '<body>Sheet3</body>',
    note: 'note text 3'
};

header = 'Brustmuskel';
note = 'Halten der Position für 5 Sekunden. Wiederholungen: 5x';
pic = 'brustmuskel.png';
htmlText = '<div>Aufrecht stehend legen Sie einen gebeugten Arm an eine Wand. Stellen Sie nun das zum erhobenen Arm gleichseitige Bein nach vorne und schieben Sie den Körper vorwärts, bis Sie ein Ziehen im Brustmuskel spüren. Achten Sie dabei besonders auf eine aufrechte Haltung!</div>';
htmlBody = '<body><h2>' + header +
            '</h2><img src="sheetPictures/' + pic +
            '" height="100" width="100" alt="Bild kann nicht geladen werden." border="3" align="center">' + htmlText +
            '</body>';

const sBrustmuskel: Sheet = new Sheet(4, header, note, htmlBody);

header = 'Hüftbeuger';
note = 'Halten der Position für 5 Sekunden. Wiederholungen: 5x';
pic = 'hueftbeuger.png';
htmlText = '<div>Ausfallschritt. Das vordere Knie hat einen größeren Winkel als 90°. Das Becken nach vorne schieben, bis Sie einen Zug in der Leiste spüren. Achten Sie darauf, dass Sie kein Hohlkreuz machen! Das heißt, dass Sie den Bauch einziehen und das Steißbein nach unten gleiten lassen.</div>';
htmlBody = '<body><h2>' + header +
            '</h2><img src="sheetPictures/' + pic +
            '" height="100" width="100" alt="Bild kann nicht geladen werden." border="3" align="center">' + htmlText +
            '</body>';

const sHueftbeuger: Sheet = new Sheet(5, header, note, htmlBody);

const e1 = new ExerciseDay (
    1,
    new Date,
    [s1, s2]
);

const e2 = new ExerciseDay (
    2,
    new Date(2023,0,30,0,5,0,0),
    [sHueftbeuger, sBrustmuskel]
);

export const EXERCISEDAYS: ExerciseDay [] = [e1, e2];
export const SHEETS: Sheet [] = [s1, s2, s3, sBrustmuskel, sHueftbeuger];

