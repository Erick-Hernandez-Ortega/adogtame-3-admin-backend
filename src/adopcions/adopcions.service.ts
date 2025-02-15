import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';
import { Model } from 'mongoose';
import { Adopcion } from './schemas/adopcion.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Pet } from 'src/pets/schemas/pet.schema';

@Injectable()
export class AdopcionsService {
  constructor(
    @InjectModel(Adopcion.name) private readonly adopcionModel: Model<Adopcion>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>
  ) { }

  async create(createAdopcionDto: CreateAdopcionDto): Promise<any> {
    const pet: Pet = await this.petModel.findById(createAdopcionDto.petId).exec();
    const user: User = await this.userModel.findById(createAdopcionDto.userId).exec();

    if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);
    if (!user) throw new HttpException('No se encontró el usuario', HttpStatus.NOT_FOUND);

    try {
      const adopcion: Adopcion = new this.adopcionModel(createAdopcionDto);
      await adopcion.save();

      return { message: 'Adopcion creada correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al crear la adopcion: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Adopcion[]> {
    try {
      const adopciones = await this.adopcionModel.find()
        .populate('petId', '-__v -updatedAt -createdAt')
        .populate('userId', '-__v -password -updatedAt -createdAt')
        .select('-__v -updatedAt')
        .exec();

      return adopciones;
    } catch (error: any) {
      throw new HttpException(`Error al obtener las adopciones: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Adopcion> {
    try {
      const adopciones = await this.adopcionModel.findById(id)
        .populate('petId', '-__v -updatedAt -createdAt')
        .populate('userId', '-__v -password -updatedAt -createdAt')
        .select('-__v -updatedAt')
        .exec();

      return adopciones;
    } catch (error: any) {
      throw new HttpException(`Error al obtener las adopciones: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateAdopcionDto: UpdateAdopcionDto) {
    return `This action updates a #${id} adopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} adopcion`;
  }
}
