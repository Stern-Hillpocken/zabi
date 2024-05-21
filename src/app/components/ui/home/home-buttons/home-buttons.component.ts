import { Component, Input } from '@angular/core';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss']
})
export class HomeButtonsComponent {

  @Input() language!: Languages;

}
