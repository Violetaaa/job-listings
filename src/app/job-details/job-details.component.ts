import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { JoblistingService } from '../services/joblisting.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent {

  private jobService = inject(JoblistingService)
  private route = inject(ActivatedRoute);
  currentJob: Job | undefined;
  jobId!: String;

  constructor() {
    this.route.params.subscribe(params => {
      this.jobId = params['id'];
    });

    this.currentJob = this.jobService.getJobById(Number(this.jobId));
  }


}

