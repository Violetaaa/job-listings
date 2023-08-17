import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-tag.component.html',
  styleUrls: ['./tool-tag.component.scss']
})
export class ToolTagComponent {

  @Input() name!: string;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  onButtonClick(name: string): void {
    this.buttonClicked.emit(name);
  }
}




