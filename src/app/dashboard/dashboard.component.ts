import { Component, OnInit } from '@angular/core';

import Hero from "../hero";
import { HeroService } from "../hero.service";

const DASHBOARD_LENGTH = 5;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.setHeroes();
  }

  setHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, DASHBOARD_LENGTH));
  }
}
