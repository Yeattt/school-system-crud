import { IsEmail, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  public name: string;

  @IsString()
  public lastname: string;

  @IsEmail()
  public email: string;
}
