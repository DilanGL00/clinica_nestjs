import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario)
    private readonly horariosRepository: Repository<Horario>,
    @InjectRepository(Odontologo)
    private readonly odontologosRepository: Repository<Odontologo>,
  ) {}

  async createHorario(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    const { id_odontologo, hora_inicio, hora_fin, fecha } = createHorarioDto;
    const odontologo = await this.odontologosRepository.findOneBy({
      id: id_odontologo,
    });

    if (!odontologo) {
      throw new NotFoundException(
        `Odontólogo con id ${id_odontologo} no encontrado`,
      );
    }

    const horario = new Horario();
    horario.odontologo = odontologo;
    horario.hora_inicio = hora_inicio;
    horario.hora_fin = hora_fin;
    horario.fecha = fecha;

    return this.horariosRepository.save(horario);
  }

  async createHorarioByLogin(
    createHorarioDto: CreateHorarioDto,
    id_odontologo: number,
  ): Promise<Horario> {
    const { hora_inicio, hora_fin, fecha } = createHorarioDto;
    const odontologo = await this.odontologosRepository.findOneBy({
      id: id_odontologo,
    });

    if (!odontologo) {
      throw new NotFoundException(
        `Odontólogo con id ${id_odontologo} no encontrado`,
      );
    }

    const horario = new Horario();
    horario.odontologo = odontologo;
    horario.hora_inicio = hora_inicio;
    horario.hora_fin = hora_fin;
    horario.fecha = fecha;

    return this.horariosRepository.save(horario);
  }

  findAllHorarios(): Promise<Horario[]> {
    return this.horariosRepository.find({ relations: ['odontologo'] });
  }

  async findOneHorario(id: number): Promise<Horario> {
    return this.horariosRepository.findOne({
      where: { id },
      relations: ['odontologo'],
    });
  }

  async updateHorario(
    id: number,
    updateHorarioDto: UpdateHorarioDto,
  ): Promise<Horario> {
    const horario = await this.horariosRepository.findOneBy({ id });
    if (!horario) {
      throw new Error('Horario no encontrado');
    }

    if (updateHorarioDto.id_odontologo) {
      const odontologo = await this.odontologosRepository.findOneBy({
        id: updateHorarioDto.id_odontologo,
      });
      if (!odontologo) {
        throw new Error('Odontologo no encontrado');
      }

      horario.odontologo = odontologo;
    }

    horario.hora_inicio = updateHorarioDto.hora_inicio ?? horario.hora_inicio;
    horario.hora_fin = updateHorarioDto.hora_fin ?? horario.hora_fin;
    horario.fecha = updateHorarioDto.fecha ?? horario.fecha;

    return this.horariosRepository.save(horario);
  }

  async removeHorario(id: number): Promise<{ affected?: number }> {
    const result = await this.horariosRepository.delete(id);
    return result;
  }

  //Otros metodos

  async getHorariosDisponibles(): Promise<Horario[]> {
    const currentDate = new Date();
    return this.horariosRepository.find({
      where: {
        fecha: MoreThanOrEqual(currentDate),
      },
    });
  }
}
