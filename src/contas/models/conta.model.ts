import { IsString, IsNumber, IsEnum, Min } from 'class-validator';

enum TiposConta {
  Corrente = 'corrente',
  Poupanca = 'poupanca',
}

export class Conta {
  @IsString()
  readonly nome: string;

  @IsEnum(TiposConta)
  readonly tipo: TiposConta;

  @IsNumber()
  @Min(0)
  readonly saldo: number;
}