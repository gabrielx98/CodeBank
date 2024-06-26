import { Controller, Get, Body, Query, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard';
import { RelatorioTransacoes } from './models/transacoes.relatorios.model';

@Controller('relatorios')
export class RelatoriosController {
    constructor(private readonly relatoriosService: RelatoriosService) {}

    @UseGuards(JwtAuthGuard)
    @Get('transacoesByQuery')
    async generateByQuery(@Query('contaId') contaId: string, @Query('dataInicial') dataInicial: string, @Query('dataFinal') dataFinal: string) {
    return this.relatoriosService.generate(contaId, new Date(dataInicial), new Date(dataFinal));
    }

    @UseGuards(JwtAuthGuard)
    @Get('transacoesByBody')
    async generateByBody(@Body() filtros: RelatorioTransacoes) {
    return this.relatoriosService.generate(filtros.contaId, filtros.dataInicial, filtros.dataFinal);
    }
}
