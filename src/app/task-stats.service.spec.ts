import { TestBed } from '@angular/core/testing';

import { StatsService } from './task-stats.service';

describe('TaskStatsService', () => {
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
