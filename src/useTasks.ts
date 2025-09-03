import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:8080/tasks';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = useCallback(async (currentOffset: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=10&offset=${currentOffset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      if (data) {
        setTasks((prevTasks) => [...prevTasks, ...data]);
        setHasMore(data.length > 0);
      } else {
        setHasMore(false);
      }
      setOffset(currentOffset + 10);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(0);
  }, [fetchTasks]);

  const addTask = async (title: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const newTask = await response.json();
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const loadMoreTasks = () => {
    if (hasMore && !loading) {
      fetchTasks(offset);
    }
  };

  return { tasks, loading, error, addTask, toggleTask, hasMore, loadMoreTasks };
};