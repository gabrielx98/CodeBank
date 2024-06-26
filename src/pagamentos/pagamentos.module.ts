import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { Pagamentos, PagamentosFactory } from './models/pagamentos.dto';
import { ContasModule } from '../contas/contas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pagamentos.name, schema: PagamentosFactory }]),
    ContasModule
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService],
  exports: [PagamentosService]
})
export class PagamentosModule {}
