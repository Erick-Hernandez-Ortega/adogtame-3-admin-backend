import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdopcionsService } from './adopcions.service';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Adopcions')
@Controller('adopcions')
export class AdopcionsController {
  constructor(private readonly adopcionsService: AdopcionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una adopcion' })
  create(@Body() createAdopcionDto: CreateAdopcionDto) {
    return this.adopcionsService.create(createAdopcionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las adopciones' })
  findAll() {
    return this.adopcionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una adopcion por su id' })
  findOne(@Param('id') id: string) {
    return this.adopcionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una adopcion por su id' })
  update(@Param('id') id: string, @Body() updateAdopcionDto: UpdateAdopcionDto) {
    return this.adopcionsService.update(+id, updateAdopcionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borra una adopcion por su id' })
  remove(@Param('id') id: string) {
    return this.adopcionsService.remove(id);
  }
}
