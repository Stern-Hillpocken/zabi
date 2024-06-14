import { Component, Input } from '@angular/core';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-loadout-header',
  templateUrl: './loadout-header.component.html',
  styleUrls: ['./loadout-header.component.scss']
})
export class LoadoutHeaderComponent {

  @Input() language!: Languages;

}
