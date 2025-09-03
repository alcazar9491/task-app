import { useState } from 'react';

interface TaskFormProps {
  addTask: (title: string) => void;
}

export const TaskForm = ({ addTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-4 mb-4 w-full md:w-1/2 lg:w-1/3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="w-full p-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white"
      />
      <button type="submit" className="w-full p-2 mt-4 text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
        Add Task
      </button>
    </form>
  );
};