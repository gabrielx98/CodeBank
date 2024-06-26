import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conta } from './models/conta.model';
import { Contas, ContaFactory } from './models/conta.dto';

@Injectable()
export class ContasService {
  constructor(@InjectModel(Contas.name) private contaModel: Model<Contas>) {}

  async create(Conta: Conta): Promise<Contas> {
    const NovaConta = new this.contaModel(Conta);
    return NovaConta.save();
  }

  async findById(contaId: string): Promise<Contas> {
    const conta = await this.contaModel.findById(contaId).exec();
    if (!conta) {
      throw new NotFoundException('Conta não encontrada!!!');
    }
    return conta;
  }
}