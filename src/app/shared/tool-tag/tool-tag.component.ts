import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-tag.component.html',
  styleUrls: ['./tool-tag.component.scss']
})

export class ToolTagComponent implements OnInit {

  @Input() name!: string;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  protected currentClass = '';

  ngOnInit(): void {
    this.assigClass(this.name);
  }

  assigClass(name: string) {
    switch (name) {
      case "Featured": {
        this.currentClass = "tag featured-tag";
        break;
      }
      case "New": {
        this.currentClass = "tag new-tag";
        break;
      }
      default: {
        this.currentClass = "tag tool-tag";
      }
    }
  }

  onButtonClick(name: string): void {
    this.buttonClicked.emit(name);
  }
}



