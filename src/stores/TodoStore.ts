import { observable, makeObservable, action, computed } from 'mobx';
class TodoStore {
  todos = [];
  constructor() {
    makeObservable(this, {
      todos: observable,
      addtodo: action,
      todoCount: computed,
    });
  }

  addtodo = (todo) => {
    this.todos.push(todo);
  };

  get todoCount() {
    return this.todos.length;
  }
}

export default new TodoStore();
