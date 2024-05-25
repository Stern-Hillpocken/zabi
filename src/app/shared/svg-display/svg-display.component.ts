import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.scss']
})
export class SvgDisplayComponent {

  @Input() path!: string;
  @Input() size: "small" | "medium" | "large"= "medium";
  @Input() rotate: "" | "left" | "right" = "";
  @Input() color: string = "";

  d!: string;

  constructor(private http: HttpClient){
    this.http.get("assets/json/svg.json").subscribe((allJsonSvg: any) => {
      this.d = allJsonSvg[this.path];
    });
  }

  rotation(): string {
    if (!this.rotate) return "";
    let value: string = this.rotate === "left" ? "-90" : this.rotate === "right" ? "90" : "0";
    return "rotate(" + value + ")";
  }
}
