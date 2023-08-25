import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../models/job';
import { JoblistingService } from '../services/joblisting.service';
import { Router } from '@angular/router';
import { JobFilterComponent } from '../job-filter/job-filter.component';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';
import { JobCardComponent } from '../job-card/job-card.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobFilterComponent, ToolTagComponent, JobCardComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];
  filteredJobs!: Job[];

  protected selectedTags$!: Observable<string[]>;

  jobService: JoblistingService = inject(JoblistingService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(response => this.jobs = response);
    this.filterJobs();
    this.selectedTags$ = this.jobService.getTags();
  }

  openJobDetail(job: Job): void {
    this.router.navigate(['/job/' + job.id]);
  }

  filterJobs() {
    this.filteredJobs = this.jobService.isTagEmpty() ?
      this.jobs
      : this.jobs.filter(job => this.isToolPresent(job))
  }

  addTool(tool: string): void {
    this.jobService.addTag(tool);
    this.filterJobs();
  }


  filterUpdatedHandler(): void {
    this.filterJobs();
  }

  isToolPresent(job: any): boolean {

    const tagsList = this.jobService.mapBSToArray();

    if (tagsList.length == 0) return false;

    for (const tag of tagsList) {
      if (!job.tools.includes(tag) && !job[tag.toLowerCase()] == true) return false;
    }

    return true;
  }

}
