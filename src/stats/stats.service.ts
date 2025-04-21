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
        { label : 'Mascotas', count: totalAvailables, color: '#64CCC9' },
        { label : 'Perros', count: availableDogs, color: '#FFD166'},
        { label : 'Gatos', count: availableCats, color: '#F78888'},
        { label : 'Otros', count: availableOthers, color: '#B2B2B2' },
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
        count: users.length,
        color: '#A0E7E5'
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
        { label: 'Adopciones', count: count_total, color: '#FDE74C' },
        { label: 'Pendientes', count: total_pending, color: '#A0E7E5' },
        { label: 'Aprobadas', count: total_approved, color: '#5CB85C' },
        { label: 'Rechazadas', count: total_rejected, color: '#D9534F' },
        { label: 'Completadas', count: total_completed, color: '#5BC0DE' }
      ];
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
        { label: 'Publicaciones', count: count_total, color: '#8E44AD' },
        { label: 'Creadas', count: total_created, color: '#3498DB' },
        { label: 'Archivadas', count: total_archived, color: '#95A5A6' },
        { label: 'Completadas', count: total_completed, color: '#2ECC71' },
        { label: 'Rechazadas', count: total_rejected, color: '#E74C3C' },
        { label: 'Aprobadas', count: total_approved, color: '#F1C40F' },
      ];
    } catch (error: any) {
      throw new HttpException(`Error al obtener las estadísticas: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
