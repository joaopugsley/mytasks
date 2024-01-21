import { useTasks } from "../../hooks/useTasks";
import { Button } from "../Button/Button";

export const TaskPaginator = () => {
  const { page, prevPage, nextPage } = useTasks();
  return (
    <div className="relative w-full max-w-96 flex flex-row justify-center items-center gap-x-3 mt-3">
      <Button onClick={prevPage} className="w-min p-1 px-2 drop-shadow-none">Back</Button>
      <span>{page}</span>
      <Button onClick={nextPage} className="w-min p-1 px-2 drop-shadow-none">Next</Button>
    </div>
  )
};