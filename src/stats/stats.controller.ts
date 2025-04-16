import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Stats')
@Controller('stats')
@UseGuards(AuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('pets-availables')
  findAllPetsAvailables() {
    return this.statsService.findAllPetsAvailables();
  }
  
  @Get('users')
  findAllUsers() {
    return this.statsService.findAllUsers();
  }
  
  @Get('adoptions')
  findAllAdoptions() {
    return this.statsService.findAllAdoptions()
  }
}
