import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport"
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import {JwtModule} from "@Nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [PassportModule, UserModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get('JWT_KEY'),
          signOptions: {
            expiresIn: '1d',
          },
        }),
      }),],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}