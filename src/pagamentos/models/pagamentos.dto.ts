import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, toJSON: { virtuals: true, transform: (doc, ret) => { delete ret._id; } } })
export class Pagamentos extends Document {
    @Prop({ required: true })
    contaId: string;

    @Prop({ required: true, min: 0 })
    valor: number;

    @Prop({ required: true })
    data: Date;

    @Prop()
    descricao: string;
}

export const PagamentosFactory = SchemaFactory.createForClass(Pagamentos);
