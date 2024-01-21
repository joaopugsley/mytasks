import { ChangeEvent, useEffect, useState } from "react";
import { MdFullscreenExit } from "react-icons/md";
import { StatusColor } from "../../types/StatusColor.enum";
import { twMerge } from "tailwind-merge";
import { Task } from "../../types/Task.type";
import { useTasks } from "../../hooks/useTasks";

type TaskProps = {
  task: Task,
  onClose: () => void;
}

interface TextAreaNativeEvent extends Event {
  inputType: string;
}

interface TextAreaEvent extends ChangeEvent<HTMLTextAreaElement> {
  nativeEvent: TextAreaNativeEvent;
}

type TaskDifferences = {
  title?: string;
  description?: string;
  status?: 'Pending' | 'InProgress' | 'Completed';
}

export const TaskModal = ({ task, onClose }: TaskProps) => {
  const { updateTask } = useTasks();
  const [inputTitle, setInputTitle] = useState<string>(task.title);
  const [inputDescription, setInputDescription] = useState<string>(task.description || "Click here to edit the task description");
  const [inputStatus, setInputStatus] = useState<'Pending' | 'InProgress' | 'Completed'>(task.status);

  const handleTextArea = (e: TextAreaEvent) => {
    // block enter key (line break)
    if(e.nativeEvent.inputType === "insertLineBreak") return;
    // update the input description state
    setInputDescription(e.target.value);
  }

  const handleStatusChange = () => {
    const validStatus: ['Pending', 'InProgress', 'Completed'] = ['Pending', 'InProgress', 'Completed'];
    setInputStatus((currentState) => {
      const currentIndex = validStatus.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % validStatus.length;
      return validStatus[nextIndex];
    });
  };

  const handleClose = async () => {
    const differences: TaskDifferences = {};
    
    if (inputTitle !== task.title) {
      differences['title'] = inputTitle;
    }
    if (inputDescription !== task.description) {
      differences['description'] = inputDescription;
    }
    if (inputStatus !== task.status) {
      differences['status'] = inputStatus;
    }

    if (Object.keys(differences).length === 0) {
      return onClose();
    }

    try {
      await updateTask(task.id, {
        ...differences
      })
      onClose();
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setInputTitle(task.title);
    setInputDescription(task.description || "Click here to edit the task description");
    setInputStatus(task.status);
  }, [task]);

  return (
    <div className="absolute w-screen h-screen bg-black/20 flex flex-col justify-center items-center p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-96 h-fit min-h-36 bg-white/95 rounded-xl drop-shadow-md border border-gray-400 p-5">
        <div className="relative mt-2 flex flex-row justify-center items-center">
          <div 
            className={twMerge("absolute left-0 w-4 h-4 rounded-full hover:scale-110", StatusColor[inputStatus])}
            onClick={handleStatusChange}
          >
          </div>
          <input 
            type="text" 
            className="absolute left-7 w-4/5 font-semibold bg-transparent focus:outline-none truncate"
            onChange={(e) => (setInputTitle(e.target.value))}
            maxLength={30}
            minLength={2}
            value={inputTitle}
          >
          </input>
          <div onClick={handleClose} className="absolute right-0 p-1 flex place-items-center hover:scale-75">
            <MdFullscreenExit className="text-2xl"/>
          </div> 
        </div>
        <div className="relative mt-5 w-full h-fit">
          <textarea 
            className="w-full bg-transparent focus:outline-none resize-none" 
            maxLength={255} 
            rows={8}
            minLength={1} 
            value={inputDescription} 
            onChange={handleTextArea}
          >
          </textarea>
        </div>
      </div>
    </div>
  )
}