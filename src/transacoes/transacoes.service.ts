import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagamentos } from './models/pagamentos.dto';
import { Pagamento } from './models/pagamentos.model';
import { ContasService } from '../contas/contas.service';

@Injectable()
export class TransacoesService {
    constructor(
    @InjectModel(Pagamentos.name) private pagamentosModel: Model<Pagamentos>,
    private contasService: ContasService
    ) {}

    async create(novoPagamento: Pagamento): Promise<Pagamentos> {
    const conta = await this.contasService.findById(novoPagamento.contaId);
    if (!conta) {
        throw new Error('Conta não Encontrada!!!');
    }
    if (conta.saldo < novoPagamento.valor) {
        throw new Error('Saldo insuficiente!!!');
    }
    conta.saldo -= novoPagamento.valor;
    await conta.save();

    const pagamento = new this.pagamentosModel(novoPagamento);
    return pagamento.save();
    }

    async findByAccountAndDateRange(contaId: string, dataInicial: Date, dataFinal: Date): Promise<Pagamentos[]> {
        return this.pagamentosModel.find({
            contaId,
            data: { $gte: dataInicial, $lte: dataFinal }
        }).exec();
    } 
}
