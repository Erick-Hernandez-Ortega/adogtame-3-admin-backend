import { Admin } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<any> {
    const adminExists: Admin = await this.adminModel.findOne({ email: createAdminDto.email });

    if (adminExists) throw new HttpException('El usuario ya existe, correo registrado', HttpStatus.CONFLICT);

    try {
      const { password, ...rest } = createAdminDto;

      const salt: string = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(password, salt);
      const newAdmin: Admin = new this.adminModel({
        password: hashedPassword,
        ...rest,
      });
      await newAdmin.save();

      return { message: 'Administrador creado correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al crear el admin: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      return await this.adminModel.find().exec();
    } catch (error: any) {
      throw new HttpException(`Error al obtener los admins: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Admin> {
    try {
      const admin: Admin = await this.adminModel.findById(id).exec();

      if (!admin) throw new HttpException('No se encontró el admin', HttpStatus.NOT_FOUND);

      return admin;
    } catch (error: any) {
      throw new HttpException(`Error al obtener el admin: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
