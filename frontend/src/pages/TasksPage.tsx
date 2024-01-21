import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { TaskProvider } from "../contexts/tasks";
import { TaskList } from "../components/TaskList/TaskList";
import { TaskPaginator } from "../components/TaskPaginator/TaskPaginator";
import { Task } from "../types/Task.type";
import { TaskModal } from "../components/TaskModal/TaskModal";
import { StatusCaption } from "../components/StatusCaption/StatusCaption";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

const TasksPage = () => {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [modalTask, setModalTask] = useState<Task>();
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handleOpenModal = (task: Task) => {
    setModalTask(task);
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalTask(undefined);
    setModalOpened(false);
  };

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate])

  return (
    <TaskProvider>
      <main className="flex flex-col items-center justify-center w-screen h-screen bg-white p-5">
        <div className="absolute top-5 flex flex-col justify-center items-center">
          <div className="ml-4 flex flex-row justify-center items-center">
            <h1 className="text-3xl font-bold text-center">MyTasks</h1>
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              {
                !menuOpen ? <MdOutlineKeyboardArrowUp className="text-3xl"/> : <MdOutlineKeyboardArrowDown className="text-3xl"/>
              }
            </button>
          </div>
          {
            menuOpen ? (
              <div className="mt-3 w-fit h-fit rounded-lg border border-black flex flex-col justify-center items-center">
                <button onClick={signOut} className="p-2 px-3 w-full h-full rounded-lg border-b border-r border-black select-none flex flex-row justify-center items-center gap-x-1">
                  <IoMdExit className="text-lg"/>
                  <span>Sign Out</span>
                </button>
              </div>
            ) : <></>
          }
        </div>
        <StatusCaption className="mb-3"/>
        <TaskList openTask={handleOpenModal}/>
        <TaskPaginator/>
        {
          modalOpened && modalTask !== undefined ? (
            <TaskModal task={modalTask} onClose={handleCloseModal}/>
          ) : <></>
        }
      </main>
    </TaskProvider> 
  );
};

export default TasksPage;