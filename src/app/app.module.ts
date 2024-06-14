import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LoadoutPageComponent } from './pages/loadout-page/loadout-page.component';
import { HomeComponent } from './components/feature/home/home.component';
import { GameComponent } from './components/feature/game/game.component';
import { LoadoutComponent } from './components/feature/loadout/loadout.component';
import { HomeHeaderComponent } from './components/ui/home/home-header/home-header.component';
import { HomeButtonsComponent } from './components/ui/home/home-buttons/home-buttons.component';
import { HomeSettingsComponent } from './components/ui/home/home-settings/home-settings.component';
import { LoadoutHeaderComponent } from './components/ui/loadout/loadout-header/loadout-header.component';
import { LoadoutLeadersComponent } from './components/ui/loadout/loadout-leaders/loadout-leaders.component';
import { LoadoutCultsComponent } from './components/ui/loadout/loadout-cults/loadout-cults.component';
import { LoadoutGameStatsComponent } from './components/ui/loadout/loadout-game-stats/loadout-game-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDisplayComponent } from './shared/card-display/card-display.component';
import { SvgDisplayComponent } from './shared/svg-display/svg-display.component';
import { MapComponent } from './components/feature/map/map.component';
import { MapHeaderComponent } from './components/ui/map/map-header/map-header.component';
import { GameHeaderComponent } from './components/ui/game/game-header/game-header.component';
import { GameCurrentCardComponent } from './components/ui/game/game-current-card/game-current-card.component';
import { GameNextCardComponent } from './components/ui/game/game-next-card/game-next-card.component';
import { GameLibraryComponent } from './components/ui/game/game-library/game-library.component';
import { GameGraveyardComponent } from './components/ui/game/game-graveyard/game-graveyard.component';
import { GameFooterComponent } from './components/ui/game/game-footer/game-footer.component';
import { PopupComponent } from './shared/popups/popups.component';
import { MapRitualChoiceComponent } from './components/ui/map/map-ritual-choice/map-ritual-choice.component';
import { InformationsComponent } from './shared/informations/informations.component';
import { DeckInformationComponent } from './shared/deck-information/deck-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GamePageComponent,
    LoadoutPageComponent,
    HomeComponent,
    GameComponent,
    LoadoutComponent,
    HomeHeaderComponent,
    HomeButtonsComponent,
    HomeSettingsComponent,
    LoadoutHeaderComponent,
    LoadoutLeadersComponent,
    LoadoutCultsComponent,
    LoadoutGameStatsComponent,
    CardDisplayComponent,
    SvgDisplayComponent,
    MapComponent,
    MapHeaderComponent,
    GameHeaderComponent,
    GameCurrentCardComponent,
    GameNextCardComponent,
    GameLibraryComponent,
    GameGraveyardComponent,
    GameFooterComponent,
    PopupComponent,
    MapRitualChoiceComponent,
    InformationsComponent,
    DeckInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
