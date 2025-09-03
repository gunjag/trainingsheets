import { contentChild, Injectable } from "@angular/core";
import { Content } from "./model/content";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ToC } from "./model/toc";
import { Sheet } from "./model/Sheet";

@Injectable({       
  providedIn: 'root',
})
export class ToCService {

    private toc: ToC|null = null;

    constructor(private http: HttpClient) {}

/**
 * loads the table of contents from the JSON file
 * from the server.
 * @returns Promise<ToC>
 */
    public async loadToC(): Promise<ToC> {
        let toc = await lastValueFrom(this.http.get(`${this.basePath()}toc_1.json`));
        console.log("json", toc);
        this.toc = toc as ToC;
        return this.toc;
    }

    public loadTocAsSheets(): Sheet[] {
        var importedSheets: Sheet[] = [];
        let tocPromise = this.loadToC();
        tocPromise.then(response => {
            for(var content of response.contents) {
                this.loadContentAsSheet(content).then(response => {
                    importedSheets.push(response);
                });;
            }
        })
        return importedSheets;
    }

    public async getContent(id: string|null): Promise<Content|null> {
        if(this.toc === null) {
            await this.loadToC();
        }
        const content = this.toc?.contents.find(
            content => content.uid === id
        );
        return content||null;
    }

    
    public async loadContent(id: string|null): Promise<string> {
        const content = await this.getContent(id);
        let html = await lastValueFrom(this.http.get(`${this.basePath()}${content?.urlOrPath}`, {responseType: 'text'}));
        console.log("content", html);
        return html;
    }

    public async loadContentAsSheet(content: Content): Promise<Sheet> {
        let html = await lastValueFrom(this.http.get(`${this.basePath()}${content?.urlOrPath}`, {responseType: 'text'}));
        return new Sheet (Number(content.uid), content.title, "", html);;
    }

    public async getPreviousContent(id: string|null): Promise<Content|null> {
        if(this.toc === null) {
            await this.loadToC();
        }
        if(!id) {
            return null;
        }
        const index = this.toc?.contents.findIndex(
            content => content.uid === id
        );
        if(index === undefined || index <= 0) {
            return null;
        }
        return this.toc?.contents[index-1]||null;
    }

    public async getNextContent(id: string|null): Promise<Content|null> {
        if(this.toc === null) {
            await this.loadToC();
        }
        if(!id) {
            return null;
        }
        const index = this.toc?.contents.findIndex(
            content => content.uid === id
        );
        if(index === undefined || index < 0 || index >= (this.toc?.contents.length||0) - 1) {
            return null;
        }
        return this.toc?.contents[index+1]||null;
    }   


    basePath(): string {
        const origin = window.location.origin + window.location.pathname;
        if(origin.startsWith('http://localhost')) {
            return 'http://localhost:4200/contents/';
        }
        return origin;
    }



}