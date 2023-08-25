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

  private jobs: Job[] = [];
  protected filteredJobs!: Job[];
  protected selectedTags!: string[];
  jobService: JoblistingService = inject(JoblistingService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(response => {
      this.jobs = response;
      this.jobService.getTags().subscribe(response => {
        this.selectedTags = response;
        this.filteredJobs = this.selectedTags.length === 0 ? this.jobs : this.jobs.filter(job => this.isToolPresent(job))
      });
    });
  }


  isToolPresent(job: any): boolean {
    if (this.selectedTags.length == 0) return false;
    for (const tag of this.selectedTags) {
      if (!job.tools.includes(tag) && !job[tag.toLowerCase()] == true) return false;
    }
    return true;
  }

  openJobDetail(job: Job): void {
    this.router.navigate(['/job/' + job.id]);
  }
}
