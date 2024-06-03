import { IsArray, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class AssignClassDto {
  @IsOptional()
  @IsPositive()
  public teacherId?: number;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  public studentIds?: number[];
}