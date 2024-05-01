import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadoutPageComponent } from './pages/loadout-page/loadout-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'loadout', component: LoadoutPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: '**', component: HomePageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
