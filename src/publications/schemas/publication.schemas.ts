import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true, collection: 'publications', versionKey: false })
export class Publication extends Document {
    @Prop({ type: Types.ObjectId, ref: 'users', required: true })
    ownerId: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: 'mascotas', required: true })
    petId: Types.ObjectId;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: false })
    description: string;

    @Prop({ type: String, enum: ['created', 'archived', 'completed', 'rejected', 'approved'], required: true })
    status: string;

    @Prop({ type: [Types.ObjectId], ref: 'users', required: false })
    adoptersIds: Types.ObjectId[];

    @Prop({ type: String, required: false })
    comments: string;
}
