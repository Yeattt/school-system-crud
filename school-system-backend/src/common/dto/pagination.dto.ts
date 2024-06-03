import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

//* ---- DTO PARA LA PAGINACIÓN DE LOS DATOS AL USAR LOS MÉTODOS DE LISTAR ---- *//
export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public page?: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public limit?: number = 10;
};