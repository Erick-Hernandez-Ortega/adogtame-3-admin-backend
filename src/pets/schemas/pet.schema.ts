import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true, collection: 'mascotas', versionKey: false })
export class Pet extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  age: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  stirilized: boolean;

  @Prop({ required: true })
  sex: string;

  @Prop({ required: true })
  typeOfPet: string;

  @Prop({ required: true })
  size: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: String })
  contentType?: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
