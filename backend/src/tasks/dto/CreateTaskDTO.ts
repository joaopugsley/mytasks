import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateTaskDTO {
  @IsString({ message: 'Title must be a string' })
  @Length(2, 30, {
    message: 'Title length must be between 2 and 30 characters',
  })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @MaxLength(255, {
    message: 'Description length must be lower than 255 characters',
  })
  @IsOptional()
  description?: string;
}
