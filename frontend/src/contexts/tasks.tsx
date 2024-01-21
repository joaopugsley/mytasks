import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { Task } from "../types/Task.type";
import { api } from "../lib/api";
import { PAGE_ITEMS } from "../lib/constants";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

type TaskContextData = {
  tasks: Task[];
  page: number;
  maxPages: number;
  loadTasks: () => Promise<void>;
  createTask: (title: string) => Promise<void>;
  updateTask: (id: number, differences: TaskDifferences) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
}

type TaskDifferences = {
  title?: string;
  description?: string;
  status?: 'Pending' | 'InProgress' | 'Completed';
}

type LoadTasksAPIResponse = {
  page: number;
  total: number;
  items: Task[];
}

export const TaskContext = createContext({} as TaskContextData)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { checkAuth, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(1);

  const loadTasks = useCallback(async () => {
    try {
      checkAuth();
      const response = await api.get<LoadTasksAPIResponse>("/api/tasks/", {
        params: {
          page: page, 
          amount: PAGE_ITEMS,
        }
      });
      setTasks(response.data.items);
      setMaxPages(response.data.total);
    } catch (error) {
      console.error('Error loading tasks:', error);
      const err = error as AxiosError;
      if(err.response && err.response.status == 401) {
        signOut();
      }
    }
  }, [page, setTasks, setMaxPages, checkAuth, signOut]);

  const createTask = async (title: string) => {
    try {
      await api.post("/api/tasks/", {
        title,
      })
      await loadTasks();
    } catch(error) {
      console.error('Error creating task:', error);
      const err = error as AxiosError;
      if(err.response && err.response.status == 401) {
        signOut();
      }
    }
  };

  const updateTask = async (id: number, differences: TaskDifferences) => {
    try {
      await api.patch(`/api/tasks/${id}`, {
        ...differences,
      })
      await loadTasks();
    } catch(error) {
      console.error('Error updating task:', error);
      const err = error as AxiosError;
      if(err.response && err.response.status == 401) {
        signOut();
      }
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      await loadTasks();
    } catch(error) {
      console.error('Error while deleting task:', error);
      const err = error as AxiosError;
      if(err.response && err.response.status == 401) {
        signOut();
      }
    }
  }

  const nextPage = async () => {
    if (page >= maxPages) {
      if (tasks.length === PAGE_ITEMS) {
        setPage((current) => current + 1);
      } else {
        setPage(1);
      }
    } else {
      setPage((current) => current + 1);
    }
  };

  const prevPage = async () => {
    if (page <= 1) {
      setPage(maxPages);
    } else {
      setPage((current) => current - 1);
    }
  };

  useEffect(() => {
    const refreshTasks = async () => {
      await loadTasks();
    };
    refreshTasks();
  }, [loadTasks, page]);

  return (
    <TaskContext.Provider 
      value={{
        tasks,
        page,
        maxPages,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        prevPage,
        nextPage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}