import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ContasModule } from './contas/contas.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/CodeBank'),//endereco banco
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutenticacaoModule,
    ContasModule,
    PagamentosModule,
    RelatoriosModule,
    UsuariosModule,
  ],
})
export class AppModule {}
