import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { Pagamento } from './models/pagamentos.model';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('pagar')
  async create(@Body() novoPagamento: Pagamento) {
    return this.pagamentosService.create(novoPagamento);
  }
}