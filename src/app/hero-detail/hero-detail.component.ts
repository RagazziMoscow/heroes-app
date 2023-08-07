import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HeroService } from "../hero.service";
import Hero from "../hero";
import Button from "../button";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;

  readonly buttons: Button[] = [
    {
      name: "Go back",
      action: this.goBack.bind(this)
    },
    {
      name: "Save",
      action: this.save.bind(this)
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero: Hero) => this.hero = hero);
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
