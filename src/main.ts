import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { randomUUID } from "node:crypto";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.setHeader("X-Request-Id", randomUUID());
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({
    origin: ["http://localhost:4200", "http://localhost:5173"],
    exposedHeaders: ["Location", "X-Request-Id"],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
