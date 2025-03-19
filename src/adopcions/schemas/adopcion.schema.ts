import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Pet } from "src/pets/schemas/pet.schema";
import { User } from "src/users/schemas/user.schema";

@Schema({ timestamps: true, collection: 'adopcions', versionKey: false })
export class Adopcion extends Document {
    @Prop({ type: Types.ObjectId, ref: Pet.name, required: true })
    petId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
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
