import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/CodeBank'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutenticacaoModule,
    ContasModule,
    TransacoesModule,
    RelatoriosModule,
    UsuariosModule,
  ],
})
export class AppModule {}
