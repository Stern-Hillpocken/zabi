import { Component } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { InformationService } from '../information.service';
import { Keywords } from 'src/app/types/keywords.type';
import { Languages } from 'src/app/types/languages.type';
import { GameStateService } from '../game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent {

  language!: Languages;

  information!: Information;
  keywordsDefinition!: any;

  constructor(private infoServ: InformationService, private gss: GameStateService, private http: HttpClient) {
    this.infoServ.get().subscribe((info: Information) => {
      this.information = info;
    });
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.language = gs.language;
    });
    this.http.get("assets/json/keywords-definition.json").subscribe((kdJson: any) => {
      this.keywordsDefinition = kdJson;
    });
  }

  close(): void {
    this.infoServ.clear();
  }

  displayDefinition(word: string | Keywords): string {
    if(this.keywordsDefinition[word]) return this.keywordsDefinition[word][this.language];
    return word;
  }
}
