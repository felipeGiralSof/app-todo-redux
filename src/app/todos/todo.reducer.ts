import { Action, createReducer, on } from '@ngrx/store';
import { borrar, borrarAllComplete, crear, editar, toggle, toggleAll } from './todo.action';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de ironman'),
  new Todo('Robar escudo del capitan america'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),
  on(borrarAllComplete, state => state.filter(todo => !todo.completado)),
  on(toggleAll,
    (state, {completado}) => state.map(todo => {
      return {...todo, completado: completado}
  })),
  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),
  on(editar, (state, {id, texto}) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }
    });
  }),
);

export function todoReducer(state: any, action: Action){
  return _todoReducer(state, action);
}

