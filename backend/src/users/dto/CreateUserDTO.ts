import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Invalid Username' })
  @Length(4, 12, {
    message: 'Username length must be between 4 and 12 characters',
  })
  @NotContains(' ', { message: 'Username cannot contains space' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @Length(4, 60, {
    message: 'Password length must be between 4 and 60 characters',
  })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
