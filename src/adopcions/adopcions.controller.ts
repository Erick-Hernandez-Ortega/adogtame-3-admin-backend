import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdopcionsService } from './adopcions.service';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';

@Controller('adopcions')
export class AdopcionsController {
  constructor(private readonly adopcionsService: AdopcionsService) {}

  @Post()
  create(@Body() createAdopcionDto: CreateAdopcionDto) {
    return this.adopcionsService.create(createAdopcionDto);
  }

  @Get()
  findAll() {
    return this.adopcionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adopcionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdopcionDto: UpdateAdopcionDto) {
    return this.adopcionsService.update(+id, updateAdopcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adopcionsService.remove(+id);
  }
}
