import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Publication, PublicationSchema } from './schemas/publication.schemas';
import { Pet, PetSchema } from 'src/pets/schemas/pet.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
    ])
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
