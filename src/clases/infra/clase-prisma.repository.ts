import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Clase } from "../dominio/entidades";
import { ClaseRepository } from "../dominio/clase.repository";
import { ActualizarClaseDto } from "../dto/actualizar-clase.dto";
import { CrearClaseDto } from "../dto/crear-clase.dto";

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany();
  }
  buscarPorId(id: number): Promise<Clase | null> {
    return this.prisma.clase.findUnique({ where: { id } });
  }
  crear(datos: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.create({ data: datos });
  }
  actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
    return this.prisma.clase
      .update({ where: { id }, data: datos })
      .catch(() => null);
  }
  eliminar(id: number): Promise<Clase | null> {
    return this.prisma.clase.delete({ where: { id } }).catch(() => null);
  }
}
