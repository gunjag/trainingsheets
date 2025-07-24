export class Sheet {
    id: number | null = 0;
    shortName: string = "";
    note: string | null = null;
    htmlBody: string | null = null;

    constructor(id?: number, shortName?: string, note?: string, htmlBody?: string) {
        this.id = id?id:null;
        this.shortName = shortName?shortName:"";
        this.note = note?note:null;
        this.htmlBody = htmlBody?htmlBody:null;
    }
}