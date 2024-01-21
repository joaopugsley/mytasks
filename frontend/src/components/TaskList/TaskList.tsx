import { BiFullscreen } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useTasks } from "../../hooks/useTasks";
import { PAGE_ITEMS } from "../../lib/constants";
import { StatusColor } from "../../types/StatusColor.enum";
import { Task } from "../../types/Task.type";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

type TaskListProps = {
  openTask: (task: Task) => void;
}

export const TaskList = ({ openTask }: TaskListProps) => {
  const { tasks, createTask, updateTask } = useTasks();
  const [taskInput, setTaskInput] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleCreateTask = async () => {
    // create the task
    await createTask(taskInput);
    // reset the input field
    setTaskInput("");
    setFocusedIndex(null);
  }

  const handleTaskInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      await handleCreateTask();
    }
  }

  const handleUpdateTaskStatus = async (task: Task) => {
    // extract id from task
    const id = task.id;

    // get next task status
    const validStatus: ['Pending', 'InProgress', 'Completed'] = ['Pending', 'InProgress', 'Completed'];
    const currentIndex = validStatus.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % validStatus.length;
    const nextStatus = validStatus[nextIndex]; // next cycle status
    
    // update the task
    await updateTask(id, {
      status: nextStatus
    })
  }

  const handleOpenTaskOnModal = (task: Task) => {
    openTask(task);
  }

  return (
    <ul className="w-full max-w-96 h-auto flex flex-col justify-center items-center overflow-hidden rounded-lg border border-black">
      {
        [...Array(PAGE_ITEMS).keys()].map((_, index) => (
          <li key={`task-${index}`} className="flex flex-row justify-center items-center bg-white w-full h-20 border-b border-r border-black last:rounded-br-lg p-5">
            {
              tasks[index] ? (
                <div className="relative w-full h-16 flex flex-row justify-center items-center">
                  <button onClick={() => {handleUpdateTaskStatus(tasks[index])}} className={twMerge('absolute left-0 w-4 h-4 rounded-full hover:scale-110', StatusColor[tasks[index].status])}></button>
                  <span className="absolute left-6 w-4/5 truncate">{tasks[index].title}</span>
                  <button className="absolute right-0 hover:scale-110" onClick={() => {handleOpenTaskOnModal(tasks[index])}}>
                    <BiFullscreen className="text-xl"/>
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-row justify-center items-center">
                  <input
                    type="text"
                    placeholder={(index === tasks.length && focusedIndex === null) ? "my new task" : ""}
                    onFocus={() => {setTaskInput(""); setFocusedIndex(index)}}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onInput={handleTaskInput}
                    value={focusedIndex === index ? taskInput : ""}
                    className="w-full bg-white focus:outline-none"
                  ></input>
                  {
                    focusedIndex === index && taskInput !== "" ? (
                      <button onClick={handleCreateTask} className="absolute right-0 w-8 h-8 flex justify-center items-center hover:scale-75">
                        <IoIosAddCircleOutline className="text-4xl text-center"/>
                      </button>
                    ) : <></>
                  }
                </div>
              )
            }
          </li>
        ))
      }
    </ul>
  )
};