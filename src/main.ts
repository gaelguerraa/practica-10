import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DominioExceptionFilter } from "./comun/filtros/dominio.filter";
import { LoggingInterceptor } from "./comun/interceptores/logging.interceptor";
import { SobreInterceptor } from "./comun/interceptores/sobre.interceptor";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(), new SobreInterceptor());
  app.useGlobalFilters(new DominioExceptionFilter());
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.enableCors({
    origin: ["http://localhost:4200", "http://localhost:5173"],
    exposedHeaders: ["Location", "X-Request-Id"],
  });

  const config = new DocumentBuilder()
    .setTitle("API del Gimnasio")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documento);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap().catch((error: unknown) => {
  console.error("No se pudo iniciar la API", error);
  process.exitCode = 1;
});
