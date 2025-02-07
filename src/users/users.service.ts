import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userModel.findOne({ email: createUserDto.email, username: createUserDto.username }).exec();

    if (userExists) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    try {
      const user = new this.userModel({
        ...createUserDto,
        date: new Date()
      });
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new HttpException('No se encontró el usuario', HttpStatus.NOT_FOUND);

    try {
      await this.userModel.findByIdAndDelete(id).exec();
    
      return { message: 'Usuario eliminado correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al eliminar el usuario: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
