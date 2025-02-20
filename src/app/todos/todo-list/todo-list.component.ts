import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filtrosValidos } from '../../filtro/filtro.action';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{

  todos: Todo[] = [];
  filtroActual!: filtrosValidos;

  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    // this.store.select('todos')
    //   .subscribe(todos => this.todos = todos);
    this.store.subscribe(({todos, filtro}) =>{
      this.todos = todos;
      this.filtroActual = filtro;
    });
  }
}
