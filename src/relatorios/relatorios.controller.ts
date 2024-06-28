import { Controller, Get, Body, Query, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard';
import { RelatorioTransacoes } from './models/transacoes.relatorios.model';

@Controller('relatorios')
export class RelatoriosController {
    constructor(private readonly relatoriosService: RelatoriosService) {}

    @UseGuards(JwtAuthGuard)
    @Get('transacoes')
    async generate(@Body() filtros: RelatorioTransacoes) {
    return this.relatoriosService.generate(filtros.contaId, filtros.dataInicial, filtros.dataFinal);
    }
}
