import { Module } from "@nestjs/common";
import { InscripcionesController } from "./inscripciones.controller";
import { InscripcionesService } from "./inscripciones.service";
import { InscripcionPrismaRepository } from "./infra/inscripcion-prisma.repository";
import { INSCRIPCION_REPOSITORY } from "./inscripciones.tokens";
import { ErrorDominioFilter } from "./infra/error-dominio.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    { provide: APP_FILTER, useClass: ErrorDominioFilter },
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionPrismaRepository,
    },
  ],
})
export class InscripcionesModule {}
