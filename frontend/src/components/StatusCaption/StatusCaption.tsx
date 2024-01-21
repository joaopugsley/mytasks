import { twMerge } from "tailwind-merge";

type StatusCaptionProps = {
  className?: string;
}

export const StatusCaption = ({ className }: StatusCaptionProps) => {
  return (
    <div className={twMerge("flex flex-row justify-center items-center gap-x-3", className)}>
      <div className="flex flex-row justify-center items-center">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="ml-1 font-light text-gray-600 text-sm select-none">Pending</span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <span className="ml-1 font-light text-gray-600 text-sm select-none">In Progress</span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        <span className="ml-1 font-light text-gray-600 text-sm select-none">Completed</span>
      </div>
    </div>
  )
}