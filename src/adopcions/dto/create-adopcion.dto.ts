import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdopcionDto {
    @IsMongoId()
    @ApiProperty({ example: '61d2a0a0a0a0a0a0a0a0a0a', description: 'Id de la mascota' })
    @IsNotEmpty()
    petId: string;

    @IsMongoId()
    @ApiProperty({ example: '61d2a0a0a0a0a0a0a0a0a0a', description: 'Id del usuario' })
    @IsNotEmpty()
    userId: string;

    @IsEnum(['pending', 'approved', 'rejected', 'completed'])
    @ApiProperty({ example: 'pending', description: 'Estado de la adopcion' })
    @IsNotEmpty()
    status: string;

    @IsString()
    @ApiProperty({ example: 'El quiere un perro', description: 'Motivo de la adopcion' })
    @IsOptional()
    reason?: string;

    @IsString()
    @ApiProperty({ example: 'Es un buen perfil para la adopcion', description: 'Comentarios de la adopcion por parte de un admin' })
    @IsOptional()
    comments?: string;
}
