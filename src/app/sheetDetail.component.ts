import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActiveService } from "./service/active-service";
import { FormsModule } from "@angular/forms";
import { Sheet } from "./data/Sheet";

@Component({
  selector: 'sheetDetail',
  template: `
    <div>
      Name<input #myInput [(ngModel)]="name"><br>
      Note<input #myInput [(ngModel)]="note"><br>
      Text<input #myInput [(ngModel)]="text">
      <button type="saveSheetButton" (click)="clickedSaveSheetButton(name,note,text)" clickable>Save</button>
    </div>
  `,
    imports: [FormsModule],
})

export class SheetDetailComponent {

 //<input [value]="name" (input)="name = ($event.target as HTMLInputElement).value"/>

  name?: string;
  note?: string;
  text?: string;

  constructor(private httpClient: HttpClient, private activeService: ActiveService) {};

  ngOnInit(): void {
    this.name = 'erster Name';
    this.note = 'erste Note';
    this.text = 'erster Text';
    this.activeService.currentSheet.subscribe(sheet => {
      this.name = sheet?.shortName;
      this.note = sheet?.note;
      this.text = sheet?.htmlBody;
    })

  }

  onChangeName(value: string) {
    this.name += value;
    console.log(this.name);
  }

  onChangeNote(value: string) {
    this.note += value;
    console.log(this.note);
  }

  onChangeText(value: string) {
    this.text += value;
    console.log(this.text);
  }
  clickedSaveSheetButton(newName: any, newNote: any, newText: any) {
    console.log("Save: ", newName, newNote, newText);
    this.activeService.currentSheet.next({shortName: newName, note: newNote, htmlBody: newText })
  }
}