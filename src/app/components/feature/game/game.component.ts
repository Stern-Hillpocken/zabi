import { Component } from '@angular/core';
import { Choice } from 'src/app/models/choice.model';
import { GameState } from 'src/app/models/game-state.model';
import { Popup } from 'src/app/models/popup.model';
import { DeckInformationService } from 'src/app/shared/deck-information.service';
import { GameStateService } from 'src/app/shared/game-state.service';
import { PopupService } from 'src/app/shared/popup.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService, private ps: PopupService, private dis: DeckInformationService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
    });
  }

  onCardChoiceMadeReceive(choice: Choice): void {
    if (this.gameState.mana >= choice.cost) {
      this.gss.applyChoice(choice);
      this.gss.moveToNextCard();
    } else {
      this.ps.create(new Popup(this.gameState.language === "fr" ? "Pas assez de mana" : "No enough mana", "error"));
    }
  }

  onDisplayNextCardOwnerReceive(): void {
    let message = "";
    if (this.gameState.language === "fr") {
      message = "Prochaine carte : " + (this.gameState.deck.nextCard.owner === "player" ? "joueur" : "ennemi");
    } else {
      message = "Next card: " + this.gameState.deck.nextCard.owner;
    }
    this.ps.create(new Popup(message, "information"));
  }

  onDisplayNextCardReceive(): void {
    this.dis.set([this.gameState.deck.nextCard]);
  }

  onDisplayLibraryReceive(): void {
    this.dis.set(this.gameState.deck.library);
  }

  onDisplayGraveyardReceive(): void {
    this.dis.set(this.gameState.deck.graveyard);
  }

}
