import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioFactory } from './dto/usuarios.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioFactory }]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60m' },
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [UsuariosController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuariosModule {}
