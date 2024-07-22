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

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    if (req.role === Role.PACIENTE) {
      return this.authService.getPacienteProfile(req.nombre_usuario);
    } else if (req.role === Role.ODONTOLOGO) {
      return this.authService.getOdontologoProfile(req.nombre_usuario);
    } else {
      throw new UnauthorizedException('Invalid user role');
    }
  }
}
