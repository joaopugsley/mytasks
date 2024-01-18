import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../types/TaskStatus.enum';

export class UpdateTaskDTO {
  @IsString({ message: 'Title must be a string' })
  @Length(2, 30, {
    message: 'Title length must be between 2 and 30 characters',
  })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Description must be a string' })
  @MaxLength(255, {
    message: 'Description length must be lower than 255 characters',
  })
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus, {
    message:
      'Status should be one of the following: Pending, InProgress, Completed, Archived',
  })
  @IsOptional()
  status?: TaskStatus;
}
