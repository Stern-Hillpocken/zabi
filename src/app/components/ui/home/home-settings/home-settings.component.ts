import { Component } from '@angular/core';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss']
})
export class HomeSettingsComponent {

  constructor(private gss: GameStateService) {}

  changeLanguage() {
    this.gss.changeLanguage();
  }

}
