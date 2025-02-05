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
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
