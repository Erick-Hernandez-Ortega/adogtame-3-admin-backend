import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>
  ) {}

  create(createPetDto: CreatePetDto) {
    return 'This action adds a new pet';
  }

  async findAll(): Promise<Pet[]> {
    try {
      return await this.petModel.find().exec();
    } catch (error: any) {
      throw new HttpException(`Error al obtener los mascotas: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Pet> {
    try {
      const pet: Pet = await this.petModel.findById(id).lean().select('-__v').exec();

      if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);

      return pet;
    } catch (error: any) {
      const errorCode: number = error?.status === 404 ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(`Error al obtener la mascota: ${error.message}`, errorCode);
    }
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
