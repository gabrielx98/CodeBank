import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, toJSON: { virtuals: true, transform: (doc, ret) => { delete ret._id; } } })
export class Usuario extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    passwordHashed: string;
}

export const UsuarioFactory = SchemaFactory.createForClass(Usuario);
