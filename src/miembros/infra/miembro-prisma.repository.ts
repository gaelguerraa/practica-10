import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Miembro } from "../dominio/entidades";
import { MiembroRepository } from "../dominio/miembro.repository";
import { ActualizarMiembroDto } from "../dto/actualizar-miembro.dto";
import { CrearMiembroDto } from "../dto/crear-miembro.dto";

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
  constructor(private readonly prisma: PrismaService) {}
  listar(): Promise<Miembro[]> {
    return this.prisma.miembro.findMany();
  }
  buscarPorId(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id } });
  }
  crear(datos: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.create({ data: { ...datos, activo: true } });
  }
  actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    return this.prisma.miembro
      .update({ where: { id }, data: datos })
      .catch(() => null);
  }
  eliminar(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.delete({ where: { id } }).catch(() => null);
  }
}
