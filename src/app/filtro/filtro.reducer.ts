import { Action, createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.action';

export const initialState: filtrosValidos = 'todos';

const _filtroReducer = createReducer<filtrosValidos>(initialState,
  on(setFiltro, (state, { filtro }): filtrosValidos => filtro),
);

export function filtroReducer(state: any, action: Action): filtrosValidos{
  return _filtroReducer(state, action);
}
