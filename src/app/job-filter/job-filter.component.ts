import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';

@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [CommonModule, ToolTagComponent],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent {

  // Input -> se recibe valor de la prop del padre
  @Input() tags!: any;

  // Output -> se pasa evento al padre
  @Output() tagRemoved: EventEmitter<string> = new EventEmitter<string>();

  onRemoveTag(tag: string) {
    this.tagRemoved.emit(tag);
  }

}