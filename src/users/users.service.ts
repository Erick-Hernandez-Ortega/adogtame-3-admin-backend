import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ClientSession, Model } from 'mongoose';
import { Pet } from 'src/pets/schemas/pet.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userModel.findOne({ email: createUserDto.email, username: createUserDto.username }).exec();

    if (userExists) throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);

    try {
      const user = new this.userModel(createUserDto);
      await user.save();
  
      return { message: 'Usuario creado correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al crear el usuario: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error: any) {
      throw new HttpException(`Error al obtener los usuarios: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.userModel.findById(id).exec();

      if (!user) throw new HttpException('No se encontró el usuario', HttpStatus.NOT_FOUND);

      return user;
    } catch (error: any) {
      throw new HttpException(`Error al obtener el usuario: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists: User = await this.userModel.findById(id).exec();

    if (!userExists) throw new HttpException('No se encontró el usuario', HttpStatus.NOT_FOUND);

    try {
      await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    
      return { message: 'Usuario actualizado correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al actualizar el usuario: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<any> {
    // TODO comprobrar si las mascotas asociadas estan adoptadas, si lo estan no eliminar mascotas, si no eliminar mascotas
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new HttpException('No se encontró el usuario', HttpStatus.NOT_FOUND);
    const session: ClientSession = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      await this.petModel.updateMany({ owner: id }, { owner: 'this user deleted' }).session(session).exec();
      await this.userModel.findByIdAndDelete(id).session(session).exec();
      await session.commitTransaction();
      session.endSession();
    
      return { message: 'Usuario eliminado correctamente' };
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      throw new HttpException(`Error al eliminar el usuario: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
