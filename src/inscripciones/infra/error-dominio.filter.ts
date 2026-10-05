import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import type { Request, Response } from "express";
import {
  CupoLlenoError,
  ErrorDominio,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from "../dominio/errores";

@Catch(ErrorDominio)
export class ErrorDominioFilter implements ExceptionFilter {
  catch(exception: ErrorDominio, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HorarioNoEncontradoError ||
      exception instanceof MiembroNoEncontradoError
        ? HttpStatus.NOT_FOUND
        : exception instanceof CupoLlenoError ||
            exception instanceof InscripcionDuplicadaError
          ? HttpStatus.CONFLICT
          : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
