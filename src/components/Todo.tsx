import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Button,
  Card,
  Classes,
  Elevation,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';

type TodoStore = {
  addtodo: (todo: string) => void;
  todos: string[];
  todoCount: number;
};

@observer
class Todo extends React.Component<{ TodoStore: TodoStore }> {
  @observable todo: string = null;

  @action
  handleChange = (todo: string) => {
    this.todo = todo;
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.todo) {
      this.props.TodoStore.addtodo(this.todo);
      this.todo = '';
    }
  };

  render() {
    const { TodoStore } = this.props;

    return (
      <Card elevation={Elevation.TWO}>
        <h2 className={Classes.HEADING}>You have {TodoStore.todoCount} todos</h2>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup label="Enter a todo" labelFor="todo-control">
            <InputGroup
              id="todo-control"
              placeholder="Add todo..."
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </FormGroup>
          <Button className={Classes.BUTTON} intent="primary" type="submit">
            Add todo
          </Button>
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
