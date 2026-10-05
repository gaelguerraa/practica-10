// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
import { IsEmail, IsIn, IsString } from "class-validator";

export class CrearMiembroDto {
  @IsString()
  nombre!: string;
  @IsEmail()
  correo!: string;
  @IsIn(["basica", "plus", "premium"])
  membresia!: string;
}
