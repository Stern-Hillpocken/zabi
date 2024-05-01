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
    HomeSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
