import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Stats')
@Controller('stats')
@UseGuards(AuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('pets-availables')
  @ApiOperation({ summary: 'Obtener mascotas disponibles' })
  findAllPetsAvailables() {
    return this.statsService.findAllPetsAvailables();
  }
  
  @Get('users')
  @ApiOperation({ summary: 'Obtener usuarios'})
  findAllUsers() {
    return this.statsService.findAllUsers();
  }
  
  @Get('adoptions')
  @ApiOperation({ summary: 'Obtener adopciones disponibles' })
  findAllAdoptions() {
    return this.statsService.findAllAdoptions();
  }
  
  @Get('publications')
  @ApiOperation({ summary: 'Obtener publicaciones disponibles' })
  findAllPublications() {
    return this.statsService.findAllPublications();
  }

  @Get('admins')
  @ApiOperation({ summary: 'Obtener todos los admins' })
  findAllAdmins() {
    return this.statsService.findAllAdmins();
  }
}
