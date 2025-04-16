import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from 'src/pets/schemas/pet.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Adopcion, AdoptionSchema } from 'src/adopcions/schemas/adopcion.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema},
      { name: Adopcion.name, schema: AdoptionSchema }
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
