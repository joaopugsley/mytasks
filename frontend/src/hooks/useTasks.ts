import { useContext } from "react";
import { TaskContext } from "../contexts/tasks";

export const useTasks = () => {
  return useContext(TaskContext);
};