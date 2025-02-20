import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toggleAll } from '../todo.action';

@Component({
  selector: 'app-todo-page',
  standalone: false,
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {

  constructor(private store:Store<AppState>){}

  toggleSelectAll: boolean = false;

  toggleAll(){
    this.toggleSelectAll = !this.toggleSelectAll
    this.store.dispatch(toggleAll({completado: this.toggleSelectAll}));
  }

}
