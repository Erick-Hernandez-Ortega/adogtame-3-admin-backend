import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async create(createPetDto: CreatePetDto): Promise<any> {
    const user: User = await this.userModel.findById(createPetDto.owner).exec();

    if (!user) throw new HttpException('No se encontró el usuario dueño', HttpStatus.NOT_FOUND);

    try {
      const pet: Pet = new this.petModel(createPetDto);
      await pet.save();

      return { message: 'Mascota creada correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al crear la mascota: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
      const pet: Pet = await this.petModel.findById(id).exec();

      if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);

      return pet;
    } catch (error: any) {
      const errorCode: number = error?.status === 404 ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(`Error al obtener la mascota: ${error.message}`, errorCode);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<any> {
    const pet = await this.petModel.findById(id).exec();

    if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);

    try {
      await this.petModel.findByIdAndUpdate(id, updatePetDto, { new: true }).exec();

      return { message: 'Mascota actualizada correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al actualizar la mascota: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<any> {
    const pet = await this.petModel.findById(id).exec();

    if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);

    try {
      await this.petModel.findByIdAndDelete(id).exec();

      return { message: 'Mascota eliminado correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al eliminar la mascota: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllNames(): Promise<Pet[]> {
    try {
      return await this.petModel.find().select('name').exec();
    } catch (error: any) {
      throw new HttpException(`Error al obtener los nombres de las mascotas: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
