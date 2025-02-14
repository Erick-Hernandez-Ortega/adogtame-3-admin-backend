import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePetDto {
    @ApiProperty({ example: 'Firulais', description: 'Nombre de la mascota' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Persa', description: 'Raza de la mascota' })
    @IsString()
    @IsNotEmpty()
    breed: string;

    @ApiProperty({ example: '3 años', description: 'Edad de la mascota' })
    @IsString()
    @IsNotEmpty()
    age: string;

    @ApiProperty({ example: 'Esta es una mascota', description: 'Descripción de la mascota' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'true', description: 'Si la mascota es esterilizada' })
    @IsBoolean()
    @IsNotEmpty()
    stirilized: boolean;

    @ApiProperty({ example: 'Hembra', description: 'Sexo de la mascota' })
    @IsString()
    @IsNotEmpty()
    sex: string;

    @ApiProperty({ example: 'Perro', description: 'Tipo de mascota' })
    @IsString()
    @IsNotEmpty()
    typeOfPet: string;

    @ApiProperty({ example: 'Grande', description: 'Tamaño de la mascota' })
    @IsString()
    @IsNotEmpty()
    size: string;

    @ApiProperty({ example: 'true', description: 'Si la mascota esta disponible' })
    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @ApiProperty({ example: '67a562bd0cfee242ba89677d', description: 'Dueño de la mascota' })
    @IsMongoId()
    @IsNotEmpty()
    owner: string;

    @ApiProperty({ example: 'imagen.jpg', description: 'Imagen de la mascota' })
    @IsString()
    @IsOptional()
    image?: string;
}
