import { Component } from '@angular/core';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss']
})
export class HomeSettingsComponent {

  colorIndex: number = 0;
  colorNames: string[] = ["sunset", "navy"];

  constructor(private gss: GameStateService) {
    document.querySelector("body")?.setAttribute("data-theme", this.colorNames[this.colorIndex]);
  }

  changeLanguage() {
    this.gss.changeLanguage();
  }

  changeTheme(): void {
    this.colorIndex ++;
    if (this.colorIndex >= this.colorNames.length) this.colorIndex = 0;
    document.querySelector("body")?.setAttribute("data-theme", this.colorNames[this.colorIndex]);
  }

}
