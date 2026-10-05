// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
import { IsOptional, IsString } from "class-validator";

export class CrearClaseDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
