import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import type Task from 'Frontend/generated/com/vaadin/demo/fusion/offline/TaskService/Task';
import { TaskService } from 'Frontend/generated/endpoints';
import { cacheable } from './cacheable';

// tag::snippet[]
export default function TasksView() {
  const tasks = useSignal<Task[]>([]);

  useEffect(() => {
    cacheable('tasks', TaskService.findTasks, []).then(
      (result) => {
        tasks.value = result;
      },
      (error: unknown) => {
        console.error('Loading the tasks failed', error);
      }
    );
  }, []);

  return (
    <ul>
      {tasks.value.map((task) => (
        <li key={task.title}>{task.title}</li>
      ))}
    </ul>
  );
}
// end::snippet[]
