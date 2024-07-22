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
import { CreatePacienteDto } from 'src/pacientes/dto/create-paciente.dto';
import { CreateOdontologoDto } from 'src/odontologos/dto/create-odontologo.dto';

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
    const { role, pacienteData, odontologoData } = registerDto;

    if (role === Role.PACIENTE && pacienteData) {
      return this.registerPaciente(pacienteData);
    } else if (role === Role.ODONTOLOGO && odontologoData) {
      return this.registerOdontologo(odontologoData);
    } else {
      throw new BadRequestException('Invalid user role or missing data');
    }
  }

  async registerPaciente(pacienteData: CreatePacienteDto) {
    const paciente = await this.pacientesService.findOneByNameUser(
      pacienteData.nombre_usuario,
    );
    if (paciente) {
      throw new BadRequestException('Paciente already exists');
    }

    const hashedPassword = await bcryptjs.hash(pacienteData.contraseña, 10);
    pacienteData.contraseña = hashedPassword;

    return await this.pacientesService.createPaciente(pacienteData);
  }

  async registerOdontologo(odontologoData: CreateOdontologoDto) {
    const odontologo = await this.odontologosService.findOneByNameUser(
      odontologoData.nombre_usuario,
    );
    if (odontologo) {
      throw new BadRequestException('Odontologo already exists');
    }

    const hashedPassword = await bcryptjs.hash(odontologoData.contraseña, 10);
    odontologoData.contraseña = hashedPassword;

    return await this.odontologosService.createOdontologo(odontologoData);
  }

  async login(loginDto: LoginDto) {
    const { nombre_usuario, contraseña, role } = loginDto;
    if (role === Role.PACIENTE) {
      return this.loginPaciente(nombre_usuario, contraseña);
    } else if (role === Role.ODONTOLOGO) {
      return this.loginOdontologo(nombre_usuario, contraseña);
    } else {
      throw new UnauthorizedException('Invalid user role');
    }
  }

  async loginPaciente(nombre_usuario: string, contraseña: string) {
    const paciente =
      await this.pacientesService.findOneByNameUser(nombre_usuario);
    if (!paciente) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(
      contraseña,
      paciente.contraseña,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      role: Role.PACIENTE,
      nombre_usuario: paciente.nombre_usuario,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      nombre_usuario: paciente.nombre_usuario,
      role: Role.PACIENTE,
    };
  }

  async loginOdontologo(nombre_usuario: string, contraseña: string) {
    const odontologo =
      await this.odontologosService.findOneByNameUser(nombre_usuario);
    if (!odontologo) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(
      contraseña,
      odontologo.contraseña,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      role: Role.ODONTOLOGO,
      nombre_usuario: odontologo.nombre_usuario,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      nombre_usuario: odontologo.nombre_usuario,
      role: Role.ODONTOLOGO,
    };
  }

  async getPacienteProfile(nombre_usuario: string) {
    return this.pacientesService.findOneByNameUser(nombre_usuario);
  }

  async getOdontologoProfile(nombre_usuario: string) {
    return this.odontologosService.findOneByNameUser(nombre_usuario);
  }
}
