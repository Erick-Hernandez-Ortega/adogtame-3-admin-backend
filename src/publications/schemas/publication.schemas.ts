import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Pet } from "src/pets/schemas/pet.schema";
import { User } from "src/users/schemas/user.schema";

@Schema({ timestamps: true, collection: 'publications', versionKey: false })
export class Publication extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    ownerId: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: Pet.name, required: true })
    petId: Types.ObjectId;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: false })
    description: string;

    @Prop({ type: String, enum: ['created', 'archived', 'completed', 'rejected', 'approved'], required: true })
    status: string;

    @Prop({ type: [Types.ObjectId], ref: User.name, required: false })
    adoptersIds: Types.ObjectId[];

    @Prop({ type: String, required: false })
    comments: string;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
