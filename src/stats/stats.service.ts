import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adopcion } from 'src/adopcions/schemas/adopcion.schema';
import { Pet } from 'src/pets/schemas/pet.schema';
import { Publication } from 'src/publications/schemas/publication.schemas';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Adopcion.name) private readonly adoptionModel: Model<Adopcion>,
    @InjectModel(Publication.name) private readonly publicationModel: Model<Publication>,
  ) {}

  async findAllPetsAvailables() {
    try {
      const pets: Pet[] = await this.petModel.find({ available: true }).exec();
      const totalAvailables: number = pets.length;
      const availableDogs: number = pets.filter(pet => pet.typeOfPet === 'Dog').length;
      const availableCats: number = pets.filter(pet => pet.typeOfPet === 'Cat').length;
      const availableOthers: number = pets.filter(pet => pet.typeOfPet === 'Other').length;
      
      return [
        { label : 'Mascotas', count: totalAvailables },
        { label : 'Perros', count: availableDogs },
        { label : 'Gatos', count: availableCats },
        { label : 'Otros', count: availableOthers },
      ]
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findAllUsers(): Promise<number | any> {
    try {
      const users: User[] = await this.userModel.find().exec();
      
      return {
        label: 'Usuarios',
        count: users.length
      }
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findAllAdoptions() {
    try {
      const adoptions: Adopcion[] = await this.adoptionModel.find().exec();
      const count_total: number = adoptions.length;
      const total_pending: number = adoptions.filter(adoption => adoption.status === 'pending').length;
      const total_approved: number = adoptions.filter(adoption => adoption.status === 'approved').length;
      const total_rejected: number = adoptions.filter(adoption => adoption.status === 'rejected').length;
      const total_completed: number = adoptions.filter(adoption => adoption.status === 'completed').length;
      
      return [
        { label : 'Adopciones', count: count_total },
        { label : 'Pendientes', count: total_pending },
        { label : 'Aprobadas', count: total_approved },
        { label : 'Rechazadas', count: total_rejected },
        { label : 'Completadas', count: total_completed },
      ]
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
  
  async findAllPublications() {
    try {
      const publications: Publication[] = await this.publicationModel.find().exec();
      const count_total: number = publications.length;
      const total_created: number = publications.filter(publication => publication.status === 'created').length;
      const total_archived: number = publications.filter(publication => publication.status === 'archived').length;
      const total_completed: number = publications.filter(publication => publication.status === 'completed').length;
      const total_rejected: number = publications.filter(publication => publication.status === 'rejected').length;
      const total_approved: number = publications.filter(publication => publication.status === 'approved').length;
      
      return [
        { label : 'Publicaciones', count: count_total },
        { label : 'Creadas', count: total_created },
        { label : 'Archivadas', count: total_archived },
        { label : 'Completadas', count: total_completed },
        { label : 'Rechazadas', count: total_rejected },
        { label : 'Aprobadas', count: total_approved },
      ]
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
