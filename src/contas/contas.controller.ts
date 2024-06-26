import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ContasService } from './contas.service';
import { Conta } from './models/conta.model';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard'; //não existe

@Controller('contas')
export class ContasController {
    constructor(private readonly contasService: ContasService){}

    @UseGuards(JwtAuthGuard)
    @Post('cadastrar')
    async create(@Body() NovaConta: Conta) {
        return this.contasService.create(NovaConta);
    }
}