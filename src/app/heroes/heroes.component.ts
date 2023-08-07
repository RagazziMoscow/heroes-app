import { Component, OnInit } from '@angular/core';

import Hero from "../hero";
import { HeroService } from "../hero.service";
import Button from "../button";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  newHeroName = "";

  button: Button = {
    name: "Add hero",
    action: this.addHero.bind(this)
  };

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.setHeroes();
  }

  addHero(): void {
    if (!this.newHeroName) return;

    this.heroService.addHero({ name: this.newHeroName.trim() } as Hero).subscribe(hero => {
      this.heroes.push(hero);
      this.newHeroName = "";
    });
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(() => this.heroes = this.heroes.filter(h => h.id !== hero.id));
  }

  private setHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => this.heroes = heroes);
  }
}
