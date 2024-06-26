import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAutenticacao } from './autenticacao.jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuariosModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
],
  providers: [AutenticacaoService, JwtAutenticacao],
  exports: [AutenticacaoService],
})

export class AutenticacaoModule {}
