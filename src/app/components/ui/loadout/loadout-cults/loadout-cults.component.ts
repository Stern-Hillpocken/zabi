import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cult } from 'src/app/models/cult.model';
import { HttpClient } from '@angular/common/http'
import { GameState } from 'src/app/models/game-state.model';


@Component({
  selector: 'app-loadout-cults',
  templateUrl: './loadout-cults.component.html',
  styleUrls: ['./loadout-cults.component.scss', '../../../../pages/loadout-page/loadout-page.component.scss']
})
export class LoadoutCultsComponent {

  @Input() gameState!: GameState;

  @Output() selectedCultEmitter: EventEmitter<string> = new EventEmitter();

  cults!: Cult[];

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('assets/json/cults.json').subscribe((result: any) => {
      this.cults = result;
    });
  }

  selectCult(englishName: string): void {
    this.selectedCultEmitter.emit(englishName);
  }

}
