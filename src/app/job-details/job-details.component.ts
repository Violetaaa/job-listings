import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JoblistingService } from '../services/joblisting.service';
import { Job } from '../models/job';
import { JobCardComponent } from "../job-card/job-card.component";

@Component({
  selector: 'app-job-details',
  standalone: true,
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  imports: [CommonModule, JobCardComponent]
})
export class JobDetailsComponent implements OnInit {

  private jobService = inject(JoblistingService)
  private route = inject(ActivatedRoute);
  currentJob!: Job;
  jobId!: string;

  constructor() {
    this.route.params.subscribe(params => {
      this.jobId = params['id'];
    });
  }

  ngOnInit(): void {
    this.jobService.getJobById(Number(this.jobId)).subscribe((response: any) => {
      this.currentJob = response;
    });

  }
}
