import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PacientesService } from 'src/pacientes/pacientes.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { OdontologosService } from 'src/odontologos/odontologos.service';
import { Role } from '../common/enums/user-role.enum';

/*
  El service es el que se conecta con otro service module, y utilizar el otro servicio
  Trae todos los metodos de otro modulo service
  */
@Injectable()
export class AuthService {
  constructor(
    private readonly pacientesService: PacientesService,
    private readonly odontologosService: OdontologosService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (registerDto.role === Role.PACIENTE) {
      const paciente = await this.pacientesService.findOneByNameUser(
        registerDto.pacienteData.nombre_usuario,
      );

      if (paciente) {
        throw new BadRequestException('Paciente already exists');
      }

      const hashedPassword = await bcryptjs.hash(
        registerDto.pacienteData.contraseña,
        10,
      );
      registerDto.pacienteData.contraseña = hashedPassword;

      return await this.pacientesService.createPaciente(
        registerDto.pacienteData,
      );
    } else {
      const odontologo = await this.odontologosService.findOneByNameUser(
        registerDto.odontologoData.nombre_usuario,
      );

      if (odontologo) {
        throw new BadRequestException('Odontologo already exists');
      }

      const hashedPassword = await bcryptjs.hash(
        registerDto.odontologoData.contraseña,
        10,
      );
      registerDto.odontologoData.contraseña = hashedPassword;

      return await this.odontologosService.createOdontologo(
        registerDto.odontologoData,
      );
    }
  }

  async login({ nombre_usuario, contraseña, role }: LoginDto) {
    let user;
    if (role === Role.PACIENTE) {
      user = await this.pacientesService.findOneByNameUser(nombre_usuario);
    } else {
      user = await this.odontologosService.findOneByNameUser(nombre_usuario);
    }

    if (!user) {
      throw new UnauthorizedException('Name user is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = { nombre_usuario: user.nombre_usuario, role: role };
    const token = await this.jwtService.signAsync(payload);

    return { token, nombre_usuario, role };
  }

  async profile({
    nombre_usuario,
    role,
  }: {
    nombre_usuario: string;
    role: string;
  }) {
    return await this.pacientesService.findOneByUserName(nombre_usuario);
  }

  async getPacienteProfile(nombre_usuario: string) {
    return this.pacientesService.findOneByNameUser(nombre_usuario);
  }

  async getOdontologoProfile(nombre_usuario: string) {
    return this.odontologosService.findOneByNameUser(nombre_usuario);
  }
}
