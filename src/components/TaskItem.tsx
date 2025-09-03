import type { Task } from '../useTasks';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
}

export const TaskItem = ({ task, toggleTask }: TaskItemProps) => {
  return (
    <li
      className={`flex items-center justify-between p-2 border-b border-white/20 ${
        task.done ? 'text-white/50 line-through' : 'text-white'
      }`}>
      <span>{task.title}</span>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
        className="appearance-none w-6 h-6 bg-transparent rounded-full border-2 border-white/50 checked:bg-green-500 checked:border-transparent focus:outline-none"
      />
    </li>
  );
};