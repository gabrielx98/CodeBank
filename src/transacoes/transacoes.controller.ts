import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { Pagamento } from './models/pagamentos.model';
import { JwtAuthGuard } from '../autenticacao/autenticacao.jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('pagar')
  async create(@Body() novoPagamento: Pagamento) {
    return this.transacoesService.create(novoPagamento);
  }

    @UseGuards(JwtAuthGuard)
    @Post('pagarComImagem')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async pagarComImagem(
        @Body()
        novoPagamento: Pagamento,
        @UploadedFile() file: Express.Multer.File
    ) {
        const imageUrl = await this.uploadFileToS3(file);
        const pagamentoRealizado = await this.transacoesService.create({
            ...novoPagamento,
            imageUrl,
        });
        return pagamentoRealizado;
    }

    private async uploadFileToS3(file: Express.Multer.File): Promise<string> {
        // lógica de upload para o S3 aqui, não possuo serviço aws S3
        return `https://aws.amazon.com/pt/s3/files/${file.originalname}.jpg`;
    }
}