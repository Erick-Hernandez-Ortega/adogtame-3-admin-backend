import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Publications')
@Controller('publications')
@UseGuards(AuthGuard)
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva publicacion' })
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una publicacion por id' })
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }
}
