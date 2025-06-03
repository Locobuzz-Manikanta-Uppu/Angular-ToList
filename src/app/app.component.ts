// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { TodoListComponent } from './todo-list/todo-list.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet,TodoListComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'angular-ToDoList';
// }

// app.component.ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, StatsPanelComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}


