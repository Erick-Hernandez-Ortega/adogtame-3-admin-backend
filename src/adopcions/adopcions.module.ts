import { Module } from '@nestjs/common';
import { AdopcionsService } from './adopcions.service';
import { AdopcionsController } from './adopcions.controller';

@Module({
  controllers: [AdopcionsController],
  providers: [AdopcionsService],
})
export class AdopcionsModule {}
