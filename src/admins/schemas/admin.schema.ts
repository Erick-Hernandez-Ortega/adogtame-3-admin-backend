import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Admin extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'default.png' })
    profilePicture: string;

    @Prop({ default: false })
    isTokenRemoved: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
