import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'erick.admin@mail.com', description: 'Correo electrónico' })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    @MinLength(3)
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ example: 'securepassword', description: 'Contraseña del admin' })
    password: string;
}