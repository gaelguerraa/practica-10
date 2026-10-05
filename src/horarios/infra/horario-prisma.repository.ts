import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Horario } from "../dominio/entidades";
import { HorarioRepository } from "../dominio/horario.repository";
import { ActualizarHorarioDto } from "../dto/actualizar-horario.dto";
import { CrearHorarioDto } from "../dto/crear-horario.dto";

@Injectable()
export class HorarioPrismaRepository implements HorarioRepository {
  constructor(private readonly prisma: PrismaService) {}
  listar(): Promise<Horario[]> {
    return this.prisma.horario.findMany();
  }
  buscarPorId(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({ where: { id } });
  }
  crear(datos: CrearHorarioDto): Promise<Horario> {
    return this.prisma.horario.create({ data: datos });
  }
  actualizar(id: number, datos: ActualizarHorarioDto): Promise<Horario | null> {
    return this.prisma.horario
      .update({ where: { id }, data: datos })
      .catch(() => null);
  }
  eliminar(id: number): Promise<Horario | null> {
    return this.prisma.horario.delete({ where: { id } }).catch(() => null);
  }
}
