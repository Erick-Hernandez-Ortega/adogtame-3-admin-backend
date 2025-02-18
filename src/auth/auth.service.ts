import { Admin } from 'src/admins/schemas/admin.schema';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>, private jwtService: JwtService) { }

    async signIn(signInDto: SignInDto): Promise<any> {
        const { email, password } = signInDto;
        const admin: Admin = await this.adminModel.findOne({ email }).exec();

        if (!admin) throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);

        const isMatch: boolean = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

        const payload = { sub: admin._id, email: admin.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
