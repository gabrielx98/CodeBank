import { IsString, IsNumber, IsDate, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RelatorioTransacoes {
    @IsString()
    @IsNotEmpty()
    readonly contaId: string;

    @IsDate()
    @Type(() => Date)
    readonly dataInicial: Date;

    @IsDate()
    @Type(() => Date)
    readonly dataFinal: Date;
}