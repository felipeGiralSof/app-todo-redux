import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.action';
import { borrarAllComplete } from '../todo.action';

@Component({
  selector: 'app-todo-footer',
  standalone: false,
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent implements OnInit{

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendiente: number = 0;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    //this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro);
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendiente = state.todos.filter(todo => !todo.completado).length;
    })
  }

  filtroSelecionado(filtro: actions.filtrosValidos){
    this.store.dispatch(actions.setFiltro({filtro:filtro}));
  }

  deleteCompleted(){
    this.store.dispatch(borrarAllComplete());
  }



}
