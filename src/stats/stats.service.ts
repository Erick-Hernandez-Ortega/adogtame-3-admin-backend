import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/pets/schemas/pet.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>) {}

  async findAllPetsAvailables() {
    try {
      const pets: Pet[] = await this.petModel.find({ available: true }).exec();
      const totalAvailables: number = pets.length;
      const availableDogs: number = pets.filter(pet => pet.typeOfPet === 'Dog').length;
      const availableCats: number = pets.filter(pet => pet.typeOfPet === 'Cat').length;
      const availableOthers: number = pets.filter(pet => pet.typeOfPet === 'Other').length;
      
      return {
        count_total: totalAvailables,
        dogs: availableDogs,
        cats: availableCats,
        others: availableOthers
      };
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
