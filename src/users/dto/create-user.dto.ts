import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Erick', description: 'Nombre del usuario' })
    name: string;

    @ApiProperty({ example: 'erick123', description: 'Nombre de usuario' })
    username: string;

    @ApiProperty({ example: '25', description: 'Edad del usuario' })
    age: string;

    @ApiProperty({ example: 'erick@mail.com', description: 'Correo electrónico' })
    email: string;

    @ApiProperty({ example: 'securepassword', description: 'Contraseña del usuario' })
    password: string;

    @ApiPropertyOptional({ example: 'default.png', description: 'Imagen de perfil' })
    imagen?: string;

    @ApiPropertyOptional({ example: false, description: 'Indica si el token fue eliminado' })
    isTokenRemoved?: boolean;

    @ApiPropertyOptional({ example: new Date(), description: 'Fecha de creación' })
    date?: Date;
}
