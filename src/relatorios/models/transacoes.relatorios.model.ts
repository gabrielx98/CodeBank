import { IsString, IsNumber, IsDate, IsNotEmpty, Min, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class RelatorioTransacoes {
    @IsString()
    @IsNotEmpty()
    readonly contaId: string;

    @IsNotEmpty()
    @IsDateString()
    readonly dataInicial: Date;

    @IsNotEmpty()
    @IsDateString()
    readonly dataFinal: Date;
}