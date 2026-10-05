// Todo opcional: un PATCH manda solo lo que cambia.
import { IsInt, IsOptional, IsString } from "class-validator";

export class ActualizarHorarioDto {
  @IsOptional()
  @IsInt()
  claseId?: number;
  @IsOptional()
  @IsString()
  dia?: string;
  @IsOptional()
  @IsString()
  horaInicio?: string;
  @IsOptional()
  @IsInt()
  cupoMaximo?: number;
  @IsOptional()
  @IsString()
  entrenador?: string;
}
