import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { OdontologosService } from 'src/odontologos/odontologos.service';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../common/enums/user-role.enum';
import { RolesGuard } from './guard/roles.guard';
import { Auth } from './decorators/auth.decorator';

/*
El controlador se dedica a recibir una peticion, ver a lo que se va
a hacer en esa peticion y le llega una respuesta 
y esa respuesta se la manda a un cliente
*/

export interface RequestWithPaciente extends Request {
  paciente: Paciente; // Puedes ajustar el tipo según tu modelo de Paciente
}

export interface RequestWithOdontologo extends Request {
  odontologo: Odontologo; // Puedes ajustar el tipo según tu modelo de Odontologo
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pacientesService: PacientesService,
    private readonly odontologosService: OdontologosService,
  ) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  /*
  @Get('profile')
  @Roles(Role.PACIENTE)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWithPaciente) {
    return this.authService.profile(req.paciente);
  }
  */

  @Get('profile')
  @Auth(Role.PACIENTE)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWithPaciente) {
    return this.authService.profile(req.paciente);
  }

  /*@Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    // Return profile based on the authenticated user's role
    if (req.paciente) {
      return this.authService.getPacienteProfile(req.paciente.nombre_usuario);
    } else if (req.odontologo) {
      return this.authService.getOdontologoProfile(
        req.odontologo.nombre_usuario,
      );
    } else {
      throw new UnauthorizedException('Invalid user role');
    }
  }
  */

  // Endpoint para obtener perfil del paciente
  @Get('perfil-paciente')
  @UseGuards(AuthGuard)
  async getPerfilPaciente(@Request() req: RequestWithPaciente) {
    const paciente = await this.pacientesService.findById(req.paciente.id);
    if (!paciente) {
      throw new NotFoundException('Paciente not found');
    }
    return paciente;
  }

  // Endpoint para obtener perfil del odontólogo
  @Get('perfil-odontologo')
  @UseGuards(AuthGuard)
  async getPerfilOdontologo(@Request() req: RequestWithOdontologo) {
    const odontologo = await this.odontologosService.findById(
      req.odontologo.id,
    );
    if (!odontologo) {
      throw new NotFoundException('Odontólogo not found');
    }
    return odontologo;
  }
}
