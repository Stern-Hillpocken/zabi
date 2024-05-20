import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.scss']
})
export class SvgDisplayComponent {

  @Input() path!: string;
  @Input() size = "";

  d!: string;

  constructor(private http: HttpClient){
    this.http.get("assets/json/svg.json").subscribe((allJsonSvg: any) => {
      this.d = allJsonSvg[this.path];
    })
  }

}
