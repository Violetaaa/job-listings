import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';
import { JoblistingService } from '../services/joblisting.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [CommonModule, ToolTagComponent],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  protected selectedTags$!: Observable<string[]>;

  jobService: JoblistingService = inject(JoblistingService);

  ngOnInit(): void {
    this.selectedTags$ = this.jobService.getTags();
  }

  // Output -> se pasa evento al padre
  @Output() updateFilter: EventEmitter<string> = new EventEmitter<string>();

  onRemoveTag(tag: string) {
    this.jobService.removeTag(tag);
    this.updateFilter.emit();
  }

  onClearFilter() {
    this.jobService.removeAllTags();
    this.updateFilter.emit();
  }

}