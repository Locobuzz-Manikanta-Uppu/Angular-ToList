// src/app/todo-list/todo-list.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatsService } from '../task-stats.service';

import { StatsPanelComponent } from '../stats-panel/stats-panel.component';

interface Task {
  title: string;
  editing: boolean;
  original?: string;
  edited?: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, StatsPanelComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  taskForm: FormGroup;
  tasks: Task[] = [];

  @Output() statsChanged = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private statsService: StatsService) {
    this.taskForm = this.fb.group({
      title: ['']
    });
  }

  addTask() {
  const title = this.taskForm.value.title.trim();
  if (title) {
    this.tasks.push({ title, editing: false, edited: false });
    this.taskForm.reset();
    this.statsService.updateStat('added', 1);
  }
}

deleteTask(index: number) {
  // If the task was edited, decrement edited count
  if (this.tasks[index].edited) {
    this.statsService.updateStat('edited', -1);
  }

  // Remove the task
  this.tasks.splice(index, 1);

  // Update added and deleted counts
  this.statsService.updateStat('added', -1);
  this.statsService.updateStat('deleted', 1);
}

editTask(index: number) {
  this.tasks[index].editing = true;
  this.tasks[index].original = this.tasks[index].title;
  // Keep current edited state intact here — do not reset to false
}

saveTask(index: number, newTitle: string) {
  const trimmedTitle = newTitle.trim();
  const task = this.tasks[index];
  const original = task.original ?? '';

  if (trimmedTitle && trimmedTitle !== original) {
    // If task was NOT edited before, mark it as edited and increment stats
    if (!task.edited) {
      this.statsService.updateStat('edited', 1);
      task.edited = true;
    }
    task.title = trimmedTitle;

  } else if (trimmedTitle === original && task.edited) {
    // If user reverted to original and task was marked edited, undo edit stat
    this.statsService.updateStat('edited', -1);
    task.edited = false;
    task.title = original;
  }
  
  task.editing = false;
}

cancelEdit(index: number) {
  const task = this.tasks[index];

  // If task was edited but user cancels (reverts), decrement edited stat
  if (task.edited && task.title !== task.original) {
    this.statsService.updateStat('edited', -1);
    task.edited = false;
  }

  // Revert title to original on cancel
  task.title = task.original ?? '';
  task.editing = false;
}

}
