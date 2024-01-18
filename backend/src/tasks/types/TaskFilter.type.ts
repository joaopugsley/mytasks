import { TaskStatus } from './TaskStatus.enum';

export type TaskFilter = {
  title?: {
    contains: string;
  };
  status?: TaskStatus;
};
