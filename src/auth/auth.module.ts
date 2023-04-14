import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy.";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Teng!n@404',
      signOptions: { expiresIn: '600000s' }
    }),
    

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],

})
export class AuthModule {

}