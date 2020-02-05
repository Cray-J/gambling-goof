import { Component, OnInit } from '@angular/core';
import { TeamsService } from "../../core/teams.service";
import { Team } from "../../shared/model/team.model";
import { BetCategory } from "../../shared/model/bet-category.model";
import { BetCategoryService } from "../../core/bet-category.service";

@Component({
  selector: 'inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
  public teams: Team[] = [];
  public categories: BetCategory[] = [];

  constructor(private teamsService: TeamsService,
              private betCategoryService: BetCategoryService) { }

  ngOnInit() {
    this.teamsService.teamsChanged.subscribe(teams => {
      console.log(teams);
      this.teams = teams;
    });

    this.betCategoryService.betCategoriesChanged.subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }

}
