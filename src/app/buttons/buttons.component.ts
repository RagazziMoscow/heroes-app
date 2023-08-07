import { Component, Input } from '@angular/core';
import Button from "../button";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input() buttons!: Button[];
}
