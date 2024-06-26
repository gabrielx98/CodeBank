import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { PagamentosModule } from '../pagamentos/pagamentos.module';

@Module({
  imports: [PagamentosModule],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
})
export class RelatoriosModule {}
