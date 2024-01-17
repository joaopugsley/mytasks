import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';

export class LoginUserDTO {
  @IsString({ message: 'Invalid username or password' })
  @IsNotEmpty({ message: 'Invalid username or password' })
  @Length(4, 12, { message: 'Invalid username or password' })
  @NotContains(' ', { message: 'Invalid username or password' })
  username: string;

  @IsString({ message: 'Invalid username or password' })
  @Length(4, 60, { message: 'Invalid username or password' })
  password: string;
}
