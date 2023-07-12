import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public deleteItemTaskList(index: number) {
    this.taskList.splice(index, 1);
  }

  public setItemTaskList(newTask: string) {
    this.taskList.push({task: newTask, status: false});
  }

  public deleteTaskList() {
    if (confirm("Você deseja realmente deletar todas as tarefas?")) {
      this.taskList = [];
    }
  }

  public validateInput(tarefa: string, index: number) {
    if(!tarefa.length) {
      if(confirm("Tarefa vazia, deseja excluir?")) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage () {
    localStorage.setItem("list", JSON.stringify(this.taskList));
  }

  ngDoCheck(): void {
    if (this.taskList) {
      this.taskList.sort( (first, last)=> Number(first.status) - Number(last.status));
      this.setLocalStorage();
    }
  }

}