import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Sheet } from "../data/Sheet";
import { ExerciseDay } from "../data/ExerciseDay";

@Injectable({
    providedIn: 'root' // Singleton
})
export class ActiveService {

    public currentSheet = new BehaviorSubject<Sheet|null>(null);
    public currentDate = new BehaviorSubject<ExerciseDay|null>(null);
    public isAdmin = false;
    constructor (){};


}