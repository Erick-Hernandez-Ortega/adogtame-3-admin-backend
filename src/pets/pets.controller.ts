import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Pets')
@Controller('pets')
@UseGuards(AuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva mascota' })
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mascotas' })
  findAll() {
    return this.petsService.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: 'Obtener todos los nombres de las mascotas' })
  findAllNames() {
    return this.petsService.findAllNames();
  }

  @Get('names/:ownerId')
  @ApiOperation({ summary: 'Obtener el nombre las mascotas por owner ID' })
  findName(@Param('ownerId') id: string) {
    return this.petsService.findNamesByOwnerId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una mascota por ID' })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borrar una mascota por ID' })
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
