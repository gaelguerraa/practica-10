import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { JwtStrategy } from "./jwt.strategy";
import { USUARIO_REPOSITORY } from "../miembros/dominio/usuario.repository";
import { UsuarioPrismaRepository } from "./usuarios-prisma.repository";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "desarrollo-inseguro-cambiar",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsuarioPrismaRepository,
    { provide: USUARIO_REPOSITORY, useExisting: UsuarioPrismaRepository },
  ],
})
export class AuthModule {}
