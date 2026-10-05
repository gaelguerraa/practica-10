// Todo opcional: un PATCH manda solo lo que cambia.
import { IsOptional, IsString } from "class-validator";

export class ActualizarClaseDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
