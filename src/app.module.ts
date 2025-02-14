import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AdopcionsModule } from './adopcions/adopcions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    PetsModule,
    AdopcionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
