import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Horario } from 'src/horarios/entities/horario.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita) private readonly citasRepository: Repository<Cita>,
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
    @InjectRepository(Horario)
    private readonly horariosRepository: Repository<Horario>,
  ) {}

  async createCita(createCitaDto: CreateCitaDto): Promise<Cita> {
    const { id_paciente, id_horario, hora_inicio, duracion, estado } =
      createCitaDto;
    const paciente = await this.pacientesRepository.findOneBy({
      id: id_paciente,
    });
    if (!paciente) {
      throw new NotFoundException(
        `Paciente con id ${id_paciente} no encontrado`,
      );
    }

    const horario = await this.horariosRepository.findOneBy({ id: id_horario });
    if (!horario) {
      throw new NotFoundException(`Horario con id ${id_horario} no encontrado`);
    }

    const cita = new Cita();
    cita.paciente = paciente;
    cita.horario = horario;
    cita.hora_inicio = hora_inicio;
    cita.duracion = duracion;
    cita.estado = estado;

    return this.citasRepository.save(cita);
  }

  findAllCitas(): Promise<Cita[]> {
    return this.citasRepository.find({ relations: ['paciente', 'horario'] });
  }

  async findOneCita(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: { id },
      relations: ['paciente', 'horario'],
    });

    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }

    return cita;
  }

  async updateCita(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.citasRepository.findOneBy({ id });

    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }

    if (updateCitaDto.id_paciente) {
      const paciente = await this.pacientesRepository.findOneBy({
        id: updateCitaDto.id_paciente,
      });
      if (!paciente) {
        throw new NotFoundException(
          `Paciente con id ${updateCitaDto.id_paciente} no encontrado`,
        );
      }
      cita.paciente = paciente;
    }

    if (updateCitaDto.id_horario) {
      const horario = await this.horariosRepository.findOneBy({
        id: updateCitaDto.id_horario,
      });
      if (!horario) {
        throw new NotFoundException(
          `Horario con id ${updateCitaDto.id_horario} no encontrado`,
        );
      }
      cita.horario = horario;
    }

    cita.hora_inicio = updateCitaDto.hora_inicio ?? cita.hora_inicio;
    cita.duracion = updateCitaDto.duracion ?? cita.duracion;
    cita.estado = updateCitaDto.estado ?? cita.estado;

    return this.citasRepository.save(cita);
  }

  async removeCita(id: number): Promise<{ affected?: number }> {
    const result = await this.citasRepository.delete(id);
    return result;
  }

  // Add the following method to CitasService
  async findCitasByPaciente(id_paciente: number) {
    return this.citasRepository.find({
      where: { paciente: { id: id_paciente } },
      relations: ['horario', 'paciente'],
    });
  }

  async findCitasByOdontologo(id_odontologo: number) {
    return this.citasRepository.find({
      where: { horario: { odontologo: { id: id_odontologo } } },
      relations: ['horario', 'paciente'],
    });
  }
}
