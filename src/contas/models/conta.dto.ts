import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, toJSON: { virtuals: true, transform: (doc, ret) => { delete ret._id; } } })
export class Contas extends Document {
    @Prop({ required: true })
    nome: string
    
    @Prop({ required: true })
    tipo: string;

    @Prop({ required: true, min: 0 })
    saldo: number;
}

export const ContaFactory = SchemaFactory.createForClass(Contas);