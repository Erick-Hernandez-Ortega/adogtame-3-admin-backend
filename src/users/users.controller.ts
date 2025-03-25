import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: 'Obtener todos los nombres de los usuarios' })
  findAllNames() {
    return this.usersService.findAllNames();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borrar un nuevo usuario por su ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
