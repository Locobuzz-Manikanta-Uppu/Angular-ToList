// stats.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private stats = {
    added: 0,
    deleted: 0,
    edited: 0,
    recovered: 0
  };

  private statsSubject = new BehaviorSubject(this.stats);
  stats$ = this.statsSubject.asObservable();

  updateStat(type: keyof typeof this.stats, delta: number) {
    this.stats[type] += delta;
    this.statsSubject.next({ ...this.stats });
  }
}

