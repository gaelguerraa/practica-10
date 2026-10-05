// Todo opcional: un PATCH manda solo lo que cambia. "activo" es el
// campo pensado para dar de baja a un miembro sin borrar su historial.
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  nombre?: string;
  @IsOptional()
  @IsEmail()
  correo?: string;
  @IsOptional()
  @IsIn(["basica", "plus", "premium"])
  membresia?: string;
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
