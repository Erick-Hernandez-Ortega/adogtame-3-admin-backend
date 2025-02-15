import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdopcionDto {
    @IsMongoId()
    @IsNotEmpty()
    petId: string;

    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsEnum(['pending', 'approved', 'rejected', 'completed'])
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsOptional()
    reason?: string;

    @IsString()
    @IsOptional()
    comments?: string;
}
