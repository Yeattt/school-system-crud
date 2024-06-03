import { IsArray, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateClassDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsOptional()
  @IsPositive()
  public teacher?: number;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  public students?: number[];
}
