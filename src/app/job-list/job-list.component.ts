import { Component, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../models/job';
import { JoblistingService } from '../services/joblisting.service';
import { Router } from '@angular/router';
import { JobFilterComponent } from '../job-filter/job-filter.component';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobFilterComponent, ToolTagComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {

  jobs: Job[];
  filteredJobs!: Job[];
  joblistingService: JoblistingService = inject(JoblistingService);
  protected selectedToolTags = new Set<string>();

  constructor(private router: Router) {
    this.jobs = this.joblistingService.getAllJobs();
    this.filteredJobs = this.jobs;
  }

  openJobDetail(job: Job): void {
    this.router.navigate(['/job/' + job.id]);
  }

  filterJobs(filter?: string) {
    this.filteredJobs = this.selectedToolTags.size != 0 ?
      this.jobs.filter(job => this.isToolPresent(job.tools, this.selectedToolTags))
      : this.jobs
  }

  addTool(tool: string): void {
    console.log("en el padre addTool" + tool);

    this.selectedToolTags.add(tool);
    this.filterJobs(tool);
  }

  tagRemovedHandler(event: any): void {
    this.selectedToolTags.delete(event);
    this.filterJobs(event);
  }

  filterClearedHandler(event: any): void {
    this.selectedToolTags.clear();
    this.filterJobs();
  }

  isToolPresent(jobTools: string[], selectedTags: any) {
    for (const tag of selectedTags) {
      if (selectedTags.size == 0 || selectedTags.length == 0 || !jobTools.includes(tag)) {
        return false;
      }
    }
    return true;
  }
}
