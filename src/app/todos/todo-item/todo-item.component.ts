import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.action';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit{

  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl( this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editar(){
    this.txtInput.setValue(this.todo.texto);
    this.editando = true;
    setTimeout(() =>{
      this.txtInputFisico.nativeElement.select();
    },1);
  }

  terminarEdicion(){
    this.editando = false;

    if(this.txtInput.invalid) return;
    if(this.txtInput.value === this.todo.texto) return;


    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
        texto: this.todo.texto
      })
    )
  }

  borrar(){
    this.store.dispatch(actions.borrar({ id:this.todo.id }))
  }


}
