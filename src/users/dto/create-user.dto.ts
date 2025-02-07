import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Erick', description: 'Nombre del usuario' })
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(40)
    name: string;

    @ApiProperty({ example: 'erick123', description: 'Nombre de usuario' })
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(15)
    username: string;

    @ApiProperty({ example: '25', description: 'Edad del usuario' })
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(1)
    @MaxLength(3)
    age: string;

    @ApiProperty({ example: 'erick@mail.com', description: 'Correo electrónico' })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    @MinLength(3)
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ example: 'securepassword', description: 'Contraseña del usuario' })
    password: string;

    @ApiPropertyOptional({ example: 'default.png', description: 'Imagen de perfil' })
    @IsOptional()
    imagen?: string;

    @ApiPropertyOptional({ example: false, description: 'Indica si el token fue eliminado' })
    @IsOptional()
    isTokenRemoved?: boolean;
}
