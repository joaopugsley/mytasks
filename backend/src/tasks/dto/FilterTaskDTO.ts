import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../types/TaskStatus.enum';

export class FilterTaskDTO {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsEnum(TaskStatus, {
    message:
      'Status should be one of the following: Pending, InProgress, Completed, Archived',
  })
  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  amount?: number = 10;
}
