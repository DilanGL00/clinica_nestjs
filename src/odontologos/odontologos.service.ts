import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOdontologoDto } from './dto/create-odontologo.dto';
import { UpdateOdontologoDto } from './dto/update-odontologo.dto';
import { Odontologo } from './entities/odontologo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectRepository(Odontologo)
    private readonly odontologosRepository: Repository<Odontologo>,
  ) {}

  async createOdontologo(
    createOdontologoDto: CreateOdontologoDto,
  ): Promise<Odontologo> {
    const odontologo = this.odontologosRepository.create(createOdontologoDto);
    return this.odontologosRepository.save(odontologo);
  }

  async findAllOdontologos(): Promise<Odontologo[]> {
    return this.odontologosRepository.find();
  }

  async viewOdontologo(id: number): Promise<Odontologo> {
    return this.odontologosRepository.findOneBy({ id });
  }

  async updateOdontologo(
    id: number,
    updateOdontologoDto: UpdateOdontologoDto,
  ): Promise<Odontologo> {
    const odontologo = await this.odontologosRepository.findOneBy({ id });

    if (!odontologo) {
      throw new NotFoundException('Odontologo no encontrado');
    }

    odontologo.nombre_usuario =
      updateOdontologoDto.nombre_usuario ?? odontologo.nombre_usuario;
    odontologo.correo_electronico =
      updateOdontologoDto.correo_electronico ?? odontologo.correo_electronico;
    odontologo.contraseña =
      updateOdontologoDto.contraseña ?? odontologo.contraseña;
    odontologo.nombre = updateOdontologoDto.nombre ?? odontologo.nombre;
    odontologo.apellido = updateOdontologoDto.apellido ?? odontologo.apellido;
    odontologo.especialidad =
      updateOdontologoDto.especialidad ?? odontologo.especialidad;

    return this.odontologosRepository.save(odontologo);
  }

  async removeOdontologo(id: number): Promise<{ affected?: number }> {
    return this.odontologosRepository.delete(id);
  }

  findOneByNameUser(nombre_usuario: string) {
    return this.odontologosRepository.findOneBy({ nombre_usuario });
  }

  async findById(id: number): Promise<Odontologo> {
    return this.odontologosRepository.findOneBy({ id });
  }
}
