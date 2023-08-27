import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoblistingService } from '../../services/joblisting.service';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';

@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [CommonModule, ToolTagComponent],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  protected selectedTags!: string[];
  jobService: JoblistingService = inject(JoblistingService);

  ngOnInit(): void {
    this.jobService.getTags().subscribe(data => {
      this.selectedTags = data
    });
  }

  onRemoveTag(tag: string) {
    this.jobService.removeTag(tag);
  }

  onClearFilter() {
    this.jobService.removeAllTags();
  }

}

