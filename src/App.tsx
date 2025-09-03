import { useTasks } from './useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const { tasks, loading, error, addTask, toggleTask, hasMore, loadMoreTasks } = useTasks();

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Task Manager</h1>
      <TaskForm addTask={addTask} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <div className="w-full flex justify-center mt-8">
        <TaskList tasks={tasks} toggleTask={toggleTask} />
      </div>

      {loading && <p className="text-white mt-4">Loading...</p>}
      {hasMore && !loading && (
        <button
          onClick={loadMoreTasks}
          className="w-full md:w-1/2 lg:w-1/3 p-2 mt-4 text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;