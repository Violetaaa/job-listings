import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../models/job';
import { JoblistingService } from '../services/joblisting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
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
    if (this.selectedToolTags.size != 0) {
      this.filteredJobs = this.jobs.filter(job => this.isToolPresent(job.tools, this.selectedToolTags))
      console.log(this.filteredJobs)
    }
    else {
      this.filteredJobs = this.jobs;
    }
  }

  addTool(tool: string): void {
    this.selectedToolTags.add(tool);
    this.filterJobs(tool);
  }

  removeTool(tool: string): void {
    this.selectedToolTags.delete(tool);
    this.filterJobs(tool);
  }

  clearTool(): void {
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
