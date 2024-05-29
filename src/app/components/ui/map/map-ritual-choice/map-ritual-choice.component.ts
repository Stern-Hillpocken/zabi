import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ritual } from 'src/app/models/ritual.model';
import { UtilsService } from 'src/app/shared/utils.service';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-map-ritual-choice',
  templateUrl: './map-ritual-choice.component.html',
  styleUrls: ['./map-ritual-choice.component.scss']
})
export class MapRitualChoiceComponent {

  @Input() language!: Languages;
  @Input() completedRituals!: string[];

  @Output() ritualSelectedEmitter: EventEmitter<string> = new EventEmitter();

  rituals: Ritual[] = [];

  constructor(private http: HttpClient, private utils: UtilsService) {
    this.http.get("assets/json/rituals.json").subscribe((jRituals: any) => {
      let availableRituals = [];
      for (const jRit of jRituals) {
        if (!this.completedRituals.includes(jRit.name.en)) availableRituals.push(jRit);
      }
      if (availableRituals.length < 2) {
        availableRituals = jRituals;
      }

      let randomFirstRitual = this.utils.random(0, availableRituals.length-1);
      let randomSecondRitual = randomFirstRitual;
      while (randomSecondRitual === randomFirstRitual) randomSecondRitual = this.utils.random(0, availableRituals.length-1);

      this.rituals.push(new Ritual(availableRituals[randomFirstRitual].name, 0, availableRituals[randomFirstRitual].value, 0, availableRituals[randomFirstRitual].rewards));
      this.rituals.push(new Ritual(availableRituals[randomSecondRitual].name, 0, availableRituals[randomSecondRitual].value, 0, availableRituals[randomSecondRitual].rewards));
    });
  }

  selectRitual(name: string): void {
    this.ritualSelectedEmitter.emit(name);
  }

}
