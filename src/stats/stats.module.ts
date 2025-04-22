import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from 'src/pets/schemas/pet.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Adopcion, AdoptionSchema } from 'src/adopcions/schemas/adopcion.schema';
import { Publication, PublicationSchema } from 'src/publications/schemas/publication.schemas';
import { Admin, AdminSchema } from 'src/admins/schemas/admin.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema},
      { name: Adopcion.name, schema: AdoptionSchema },
      { name: Publication.name, schema: PublicationSchema},
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
