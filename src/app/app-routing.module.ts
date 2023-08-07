import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routerConfig: Routes = [
  { path: "heroes", component: HeroesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "detail/:id", component: HeroDetailComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" } // default
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
