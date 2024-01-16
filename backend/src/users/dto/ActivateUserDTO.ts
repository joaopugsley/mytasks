import { IsString, Length } from 'class-validator';

export class ActivateUserDTO {
  @IsString({ message: 'Invalid Activation Key' })
  @Length(90, 90, { message: 'Invalid Activation Key' })
  activation_key: string;
}
