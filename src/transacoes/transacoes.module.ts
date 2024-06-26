import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesService } from './transacoes.service';
import { TransacoesController } from './transacoes.controller';
import { Pagamentos, PagamentosFactory } from './models/pagamentos.dto';
import { ContasModule } from '../contas/contas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pagamentos.name, schema: PagamentosFactory }]),
    ContasModule
  ],
  controllers: [TransacoesController],
  providers: [TransacoesService],
  exports: [TransacoesService]
})
export class TransacoesModule {}
