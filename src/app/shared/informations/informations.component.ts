import { Component } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent {

  information!: Information;

  constructor(private infoServ: InformationService) {
    this.infoServ.get().subscribe((info: Information) => {
      this.information = info;
    });
  }

  close(): void {
    this.infoServ.clear();
  }
}
