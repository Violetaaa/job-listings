import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../models/job';
import { JoblistingService } from '../services/joblisting.service';
import { Router } from '@angular/router';
import { JobFilterComponent } from '../job-filter/job-filter.component';
import { ToolTagComponent } from '../shared/tool-tag/tool-tag.component';
import { Tags } from '../shared/constants';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/internal/operators/filter';
import { JobCardComponent } from '../job-card/job-card.component';

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
  // filteredJobs!: BehaviorSubject<Job[]>;

  protected selectedToolTags = new Set<string>();

  joblistingService: JoblistingService = inject(JoblistingService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.joblistingService.getAllJobs().subscribe(response => this.jobs = response);
    this.filteredJobs = this.jobs;
    this.joblistingService.setFilteredJobs(this.jobs);
  }

  openJobDetail(job: Job): void {
    this.router.navigate(['/job/' + job.id]);
  }

  filterJobs(filter?: string) {
    this.filteredJobs = this.selectedToolTags.size != 0 ?
      this.jobs.filter(job => this.isToolPresent(job, this.selectedToolTags))
      : this.jobs
  }

  addTool(tool: string): void {
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

  isToolPresent(job: any, selectedTags: any): boolean {
    if (selectedTags.size == 0 || selectedTags.length == 0) return false;

    for (const tag of selectedTags) {
      if (!job.tools.includes(tag) && !job[tag.toLowerCase()] == true) return false;
    }

    return true;
  }


}
