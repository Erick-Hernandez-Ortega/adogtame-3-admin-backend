import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './schemas/publication.schemas';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Pet } from 'src/pets/schemas/pet.schema';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name) private readonly publicationModel: Model<Publication>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Pet.name) private readonly petModel: Model<Pet>
  ) {}

  async create(createPublicationDto: CreatePublicationDto): Promise<any> {
    const pet: Pet = await this.petModel.findById(createPublicationDto.petId).exec();
    const user: User = await this.userModel.findById(createPublicationDto.ownerId).exec();

    if (!pet) throw new HttpException('No se encontró la mascota', HttpStatus.NOT_FOUND);
    if (!user) throw new HttpException('No se encontró el usuario owner', HttpStatus.NOT_FOUND);
    if (!pet.available) throw new HttpException('La mascota no está disponible', HttpStatus.CONFLICT);

    if (createPublicationDto.ownerId !== pet.owner.toString()) 
      throw new HttpException('El dueño de la mascota no coincide con el dueño de la publicación', HttpStatus.CONFLICT);

    try {
      createPublicationDto.status = 'created';
      await this.publicationModel.create(createPublicationDto);

      return { message: 'Publicación creada correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al crear la publicación: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Publication[]> {
    try {
      const publications: Publication[] = await this.publicationModel
        .find()
        .populate('ownerId', 'name')
        .populate('petId', 'name')
        .exec();

      return publications;
    } catch (error: any) {
      throw new HttpException(`Error al obtener las publicaciones: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Publication> {
    try {
      const publication: Publication = await this.publicationModel
        .findById(id)
        .populate('ownerId', '-password -updatedAt -createdAt -isTokenRemoved')
        .populate('petId', '-updatedAt -createdAt -owner')
        .exec();

      return publication;
    } catch (error: any) {
      throw new HttpException(`Error al obtener la publicación: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    const publication: Publication = await this.publicationModel.findById(id).exec();

    if (!publication) throw new HttpException('No se encontró la publicación', HttpStatus.NOT_FOUND);

    try {
      await this.publicationModel.findByIdAndUpdate(id, updatePublicationDto, { new: true }).exec();

      return { message: 'Publicación actualizada correctamente' };
    } catch (error: any) {
      throw new HttpException(`Error al actualizar la publicación: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<any> {
    const publication: Publication = await this.publicationModel.findById(id).exec();

    if (!publication) throw new HttpException('No se encontró la publicación', HttpStatus.NOT_FOUND);
  
    try {
      await publication.deleteOne();

      return { message: 'Publicación eliminada correctamente' };
    } catch (error) {
      throw new HttpException(`Error al eliminar la publicación: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
