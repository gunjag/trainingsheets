import { Component, OnInit } from '@angular/core';
import { SheetNavigationComponent } from '../sheet-navigation/sheet-navigation.component';
import { NoteComponent } from '../note/note.component';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sheet1',
  imports: [ CommonModule, SheetNavigationComponent, NoteComponent ],
  templateUrl: './sheet1.component.html',
  styleUrl: './sheet1.component.css'
})
export class Sheet1Component {

  content: string="";

  constructor(private httpClient: HttpClient){};

  ngOnInit(): void {
    
    //this.http.get('assets/sheet1.html').subscribe(data => {
      //console.log(data.text());
    //})

    //this.httpClient.get('assets/sheet1.html', {responseType: 'text'}).subscribe((x)=>{console.log(x)});


    this.content = "contenSheet1";
    
    
  }

}
