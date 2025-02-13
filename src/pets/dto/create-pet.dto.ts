import { Type } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    breed: string;

    @IsString()
    @IsNotEmpty()
    age: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsNotEmpty()
    stirilized: boolean;

    @IsString()
    @IsNotEmpty()
    sex: string;

    @IsString()
    @IsNotEmpty()
    typeOfPet: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @IsMongoId()
    @IsNotEmpty()
    owner: string;

    @IsOptional()
    image?: string;
}
