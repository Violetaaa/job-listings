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
      this.filteredJobs = this.filteredJobs.filter(job => this.isPresent(job.tools, this.selectedToolTags))
      console.log(this.filteredJobs)
    }
    else {
      this.filteredJobs = this.jobs;
    }
  }

  //
  addTool(tool: string): void {
    this.selectedToolTags.add(tool);
    console.log(tool)
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

  isPresent(a: string[], b: any) {
    for (const value of a) {
      if ((!b.has(value)) || b.size == 0 || a.length == 0) {
        return false;
      }
    }
    return true;
  }
}