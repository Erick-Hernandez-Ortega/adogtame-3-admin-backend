import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true, collection: 'adopcions' })
export class Adopcion extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
    petId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        required: true
    })
    status: string;

    @Prop({ type: String, default: null })
    reason?: string;

    @Prop({ type: String, default: null })
    comments?: string
}

export const AdoptionSchema = SchemaFactory.createForClass(Adopcion);
