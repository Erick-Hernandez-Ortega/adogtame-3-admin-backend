import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdatePublicationDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Lindo perro para adoptar', description: 'Titulo de la publicacion' })
    title?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Perro de 3 años...', description: 'Descripcion de la publicacion' })
    description?: string;

    @IsEnum(['created', 'archived', 'completed', 'rejected', 'approved'])
    @ApiProperty({ example: 'created', description: 'Estado de la adopcion' })
    @IsOptional()
    status?: string;
}
