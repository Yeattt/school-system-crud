import { IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  public name: string;

  @IsString()
  public lastname: string;

  @IsEmail()
  public email: string;
}
