import { IsString, IsNumber, IsDate, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagamento {
    @IsString()
    @IsNotEmpty()
    readonly contaId: string;

    @IsNumber()
    @Min(0)
    readonly valor: number;

    @IsDate()
    @Type(() => Date)
    readonly data: Date;

    @IsString()
    readonly descricao: string;

    /*@IsOptional()
    @IsString()
    readonly imageUrl?: string;*/
}
