import { observable, makeObservable, action, computed } from 'mobx';
class TodoStore {
  todos: string[] = [];
  constructor() {
    makeObservable(this, {
      todos: observable,
      addtodo: action,
      todoCount: computed,
    });
  }

  addtodo = (todo: string) => {
    this.todos.push(todo);
  };

  get todoCount(): number {
    return this.todos.length;
  }
}

export default new TodoStore();
