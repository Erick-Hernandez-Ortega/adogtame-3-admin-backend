import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'src/admins/schemas/admin.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) { }

    async signIn(signInDto: SignInDto): Promise<any> {
        const { email, password } = signInDto;
        const admin: Admin = await this.adminModel.findOne({ email }).exec();

        if (!admin) throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);

        return 'deed'
    }
}
