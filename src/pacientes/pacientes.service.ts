import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
  ) {}

  async createPaciente(
    createPacienteDto: CreatePacienteDto,
  ): Promise<Paciente> {
    const paciente = this.pacientesRepository.create(createPacienteDto);
    return await this.pacientesRepository.save(paciente);
  }

  async findAllPacientes(): Promise<Paciente[]> {
    return await this.pacientesRepository.find();
  }

  async viewPaciente(id: number): Promise<Paciente> {
    const paciente = await this.pacientesRepository.findOneBy({ id });
    if (!paciente) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    return paciente;
  }

  async updatePaciente(
    id: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.pacientesRepository.findOneBy({ id });

    if (!paciente) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    paciente.nombre_usuario =
      updatePacienteDto.nombre_usuario ?? paciente.nombre_usuario;
    paciente.correo_electronico =
      updatePacienteDto.correo_electronico ?? paciente.correo_electronico;
    paciente.contraseña = updatePacienteDto.contraseña ?? paciente.contraseña;
    paciente.nombre = updatePacienteDto.nombre ?? paciente.nombre;
    paciente.apellido = updatePacienteDto.apellido ?? paciente.apellido;
    paciente.fecha_nacimiento =
      updatePacienteDto.fecha_nacimiento ?? paciente.fecha_nacimiento;
    paciente.direccion = updatePacienteDto.direccion ?? paciente.direccion;
    paciente.telefono = updatePacienteDto.telefono ?? paciente.telefono;
    return this.pacientesRepository.save(paciente);
  }

  async removePaciente(id: number): Promise<{ affected?: number }> {
    const result = await this.pacientesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    return result;
  }

  findOneByEmail(correo_electronico: string) {
    return this.pacientesRepository.findOneBy({ correo_electronico });
  }

  findByUserWithPassword(nombre_usuario: string) {
    return this.pacientesRepository.findOne({
      where: { nombre_usuario },
      select: [
        'id',
        'nombre_usuario',
        'correo_electronico',
        'contraseña',
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'direccion',
        'telefono',
      ],
    });
  }

  findOneByNameUser(nombre_usuario: string) {
    return this.pacientesRepository.findOneBy({ nombre_usuario });
  }

  async findOneByUserName(nombre_usuario: string): Promise<Paciente> {
    return this.pacientesRepository.findOneBy({ nombre_usuario });
  }

  async findById(id: number): Promise<Paciente> {
    return this.pacientesRepository.findOneBy({ id });
  }
}
