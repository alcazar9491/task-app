import type { Task } from '../useTasks';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

export const TaskList = ({ tasks, toggleTask }: TaskListProps) => {
  return (
    <ul className="glass p-4 w-full md:w-1/2 lg:w-1/3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </ul>
  );
};