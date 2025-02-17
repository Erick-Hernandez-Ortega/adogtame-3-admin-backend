import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ example: 'Erick', description: 'Nombre del admin' })
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(40)
    name: string;

    @ApiProperty({ example: 'erick.admin@mail.com', description: 'Correo electrónico del admin' })
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

    @ApiPropertyOptional({ example: 'default.png', description: 'Imagen de perfil del admin' })
    @IsOptional()
    imagen?: string;

    @ApiPropertyOptional({ example: false, description: 'Indica si el token fue eliminado' })
    @IsOptional()
    isTokenRemoved?: boolean;
}
