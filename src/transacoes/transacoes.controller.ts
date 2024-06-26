import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { Pagamento } from './models/pagamentos.model';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly pagamentosService: TransacoesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('pagar')
  async create(@Body() novoPagamento: Pagamento) {
    return this.pagamentosService.create(novoPagamento);
  }
}