import { Component } from '@angular/core';
import { PopupService } from '../popup.service';
import { Popup } from 'src/app/models/popup.model';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupComponent {

  popups!: Popup[];

  constructor(private ps: PopupService) {
    this.ps.getPopups().subscribe((p: Popup[]) => {
      this.popups = p;
    });
  }

  close(index: number): void {
    this.ps.delete(index);
  }

}
