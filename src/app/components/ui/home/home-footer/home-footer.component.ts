import { Component, Input } from '@angular/core';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent {

  @Input() language!: Languages;

}
