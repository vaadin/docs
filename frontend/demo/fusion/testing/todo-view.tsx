import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, TextField } from '@vaadin/react-components';
import { TodoService } from 'Frontend/generated/endpoints';

// tag::snippet[]
export default function TodoView() {
  const todos = useSignal<string[]>([]);
  const newTodo = useSignal('');

  async function addTodo() {
    await TodoService.addTodo(newTodo.value);
    todos.value = [...todos.value, newTodo.value];
    newTodo.value = '';
  }

  return (
    <section>
      <h2>Todos</h2>
      <TextField
        label="New todo"
        value={newTodo.value}
        onValueChanged={(event) => {
          newTodo.value = event.detail.value;
        }}
      />
      <Button onClick={addTodo}>Add</Button>
      <ul>
        {todos.value.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </section>
  );
}
// end::snippet[]
