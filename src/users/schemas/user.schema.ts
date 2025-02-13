import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;
  
    @Prop()
    username: string;
  
    @Prop({ required: true })
    age: string;
  
    @Prop({ required: true })
    email: string;
  
    @Prop({ required: true })
    password: string;
  
    @Prop({ default: 'default.png' })
    imagen: string;
  
    @Prop({ default: false })
    isTokenRemoved: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
