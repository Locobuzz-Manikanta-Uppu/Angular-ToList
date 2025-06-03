// stats-panel.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../task-stats.service';

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats">
      <p>✅ Added: {{ stats.added }}</p>
      <p>🗑️ Deleted: {{ stats.deleted }}</p>
      <p>✏️ Edited: {{ stats.edited }}</p>
    </div>
  `,
  styles: [`
    .stats {
      background-color: #fff8dc;
      border: 1px solid #ccc;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 6px;
    }
    .stats p {
      margin: 5px 0;
    }
  `]
})
export class StatsPanelComponent {
  stats = { added: 0, deleted: 0, edited: 0, recovered: 0 };

  constructor(private statsService: StatsService) {
    this.statsService.stats$.subscribe(s => this.stats = s);
  }
}
