import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { ContaFactory, Contas} from './models/conta.dto';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Contas.name, schema: ContaFactory}]),
    ],
    controllers: [ContasController],
    providers: [ContasService],
    exports: [ContasService]
})

export class ContasModule {}