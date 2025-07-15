export class Sheet {
    id: number | null = 0;
    shortName: string = "";
    note: string | null = null;
    htmlBody: string | null = null;

    constructor(id?: number) {
        this.id = id?id:null;
    }
}