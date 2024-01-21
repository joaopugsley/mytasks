import { twMerge } from "tailwind-merge";

type TaskAlertProps = {
  message: string;
  success: boolean;
  className?: string;
}

export const TaskAlert = ({ message, success, className }: TaskAlertProps) => {
  if (message !== '') {
    return (
      <div className={twMerge(`w-full max-w-96 h-auto px-4 py-3 rounded-md border break-words overflow-hidden text-center ${!success ? 'border-red-300 bg-red-200' : 'border-emerald-300 bg-emerald-200'}`, className)}>
        {message}
      </div>
    )
  } else {
    return <></>
  }
}