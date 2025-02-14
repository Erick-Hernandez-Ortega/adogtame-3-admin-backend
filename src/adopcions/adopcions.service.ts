import { Injectable } from '@nestjs/common';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';

@Injectable()
export class AdopcionsService {
  create(createAdopcionDto: CreateAdopcionDto) {
    return 'This action adds a new adopcion';
  }

  findAll() {
    return `This action returns all adopcions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adopcion`;
  }

  update(id: number, updateAdopcionDto: UpdateAdopcionDto) {
    return `This action updates a #${id} adopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} adopcion`;
  }
}
