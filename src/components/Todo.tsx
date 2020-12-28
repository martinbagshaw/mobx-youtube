import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Classes, Elevation } from '@blueprintjs/core';

type TodoStore = {
  addtodo: (string) => void;
  todos: string[];
  todoCount: number;
};

@inject('TodoStore')
@observer
class Todo extends React.Component<{ TodoStore: TodoStore }> {
  handleSubmit = (e) => {
    e.preventDefault();
    const todo = this.todo.value;
    if (todo) {
      this.props.TodoStore.addtodo(todo);
      this.todo.value = '';
    }
  };

  render() {
    const { TodoStore } = this.props;

    return (
      <Card elevation={Elevation.TWO}>
        <h2 className={Classes.HEADING}>You have {TodoStore.todoCount} todos</h2>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label className={Classes.LABEL} htmlFor="todo-control">
            Enter a todo
          </label>
          <input
            className={Classes.INPUT}
            id="todo-control"
            type="text"
            placeholder="Enter a todo"
            ref={(input) => (this.todo = input)}
          />
          <button className={Classes.BUTTON} intent="primary" type="submit">
            Add todo
          </button>
        </form>

        <ul className={Classes.LIST}>
          {TodoStore.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </Card>
    );
  }
}

export default Todo;
