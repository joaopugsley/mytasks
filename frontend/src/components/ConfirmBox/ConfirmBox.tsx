import { Button } from "../Button/Button";

type ConfirmBoxProps = {
  question: string,
  action?: () => void | Promise<void>;
  onClose: () => void;
}

export const ConfirmBox = ({ question, action, onClose }: ConfirmBoxProps) => {
  
  const handleConfirm = async () => {
    if (action) {
      await action();
    }
    onClose();
  };

  return (
    <div className="absolute w-screen h-screen bg-black/20 flex flex-col justify-center items-center p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-64 h-fit min-h-24 flex flex-col justify-center items-center bg-white/95 rounded-xl drop-shadow-md border border-gray-300 p-3 py-5 gap-y-5">
        <h1 className="w-full text-center break-words">{question}</h1>
        <div className="flex flex-row justify-center items-center gap-x-3">
          <Button className="p-2 w-24 bg-emerald-400 hover:bg-emerald-500 font-bold drop-shadow-none shadow-none" onClick={handleConfirm}>Confirm</Button>
          <Button className="p-2 w-24 bg-red-400 hover:bg-red-500 font-bold drop-shadow-none shadow-none" onClick={onClose}>Cancel</Button>      
        </div>
      </div>
    </div>
  )
}