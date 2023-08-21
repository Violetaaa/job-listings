import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../models/job';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';
import { Tags } from '../shared/constants';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, ToolTagComponent],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job!: Job;

  protected newTag = Tags.new;
  protected featuredTag = Tags.featured;

  addTool(tool: String) { }
}
