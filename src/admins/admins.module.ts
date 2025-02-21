import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
    ])
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
