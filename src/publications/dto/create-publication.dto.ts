import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsMongoId()
    @ApiProperty({ example: '61d2a0a0a0a0a0a0a0a0a0a', description: 'Id del dueno' })
    @IsNotEmpty()
    ownerId: string;

    @IsMongoId()
    @ApiProperty({ example: '61d2a0a0a0a0a0a0a0a0a0a', description: 'Id de la mascota' })
    @IsNotEmpty()
    petId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Lindo perro para adoptar', description: 'Titulo de la publicacion' })
    title: string;

    @IsString()
    @ApiProperty({ example: 'Perro de 3 años...', description: 'Descripcion de la publicacion' })
    description: string;

    @IsEnum(['created', 'archived', 'completed', 'rejected', 'approved'])
    @ApiProperty({ example: 'created', description: 'Estado de la adopcion' })
    @IsOptional()
    status: string;

    @ApiProperty({ example: ['61d2a0a0a0a0a0a0a0a0a0a', '61d2a0a0a0a0a0a0a0a0a0a'], description: 'Id de los adoptantes interesados' })
    adoptersIds: string[]
}
