import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { ActiveService } from "./service/active-service";
import { DataService } from "./service/data.service";
import { FormsModule } from "@angular/forms";
import { Sheet } from "./data/Sheet";

@Component({
  selector: 'sheetDetail',
  templateUrl: './sheetDetail.components.html',
  styleUrl: './sheetDetail.components.css',
  imports: [FormsModule],
})

export class SheetDetailComponent {

 //<input [value]="name" (input)="name = ($event.target as HTMLInputElement).value"/>

  @Input()  
  set sheet(newSheet: Sheet) {
    const x = JSON.stringify(newSheet);
    this._sheet = JSON.parse(JSON.stringify(newSheet));
  }

  get sheet() {
    return this._sheet;
  }

  _sheet: Sheet = new Sheet();

  constructor(private httpClient: HttpClient, private activeService: ActiveService, private dataService: DataService) {};

  ngOnInit(): void {
    /*
    this.activeService.currentSheet.subscribe(sheet => {
      this.sheet = sheet as Sheet;
      console.log("Detail Sheet: ", sheet);
    })
      */
  }

  clickedSaveSheetButton() {
    if (this.sheet != null) {
      console.log("Save: ", this.sheet);
      //console.log("Save old: ", this.activeService.currentSheet.shortName);
      //this.activeService.currentSheet.next({id: oldId, shortName: newName, note: newNote, htmlBody: newText })
      this.dataService.editSheet(this.sheet);
    }
  }
}