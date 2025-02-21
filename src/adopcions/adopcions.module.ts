import { Module } from '@nestjs/common';
import { AdopcionsService } from './adopcions.service';
import { AdopcionsController } from './adopcions.controller';
import { Adopcion, AdoptionSchema } from './schemas/adopcion.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from 'src/pets/schemas/pet.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Adopcion.name, schema: AdoptionSchema },
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AdopcionsController],
  providers: [AdopcionsService],
})
export class AdopcionsModule {}
