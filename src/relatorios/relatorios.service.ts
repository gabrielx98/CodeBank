import { Injectable } from '@nestjs/common';
import { PagamentosService } from '../pagamentos/pagamentos.service';

@Injectable()
export class RelatoriosService {
  constructor(private pagamentosService: PagamentosService) {}

  async generate(contaId: string, dataInicial: Date, dataFinal: Date) {
    const pagamentos = await this.pagamentosService.findByAccountAndDateRange(contaId, dataInicial, dataFinal);
    const total = pagamentos.reduce((sum, pagamento) => sum + pagamento.valor, 0);
    return {
      pagamentos,
      total,
    };
  }
}
