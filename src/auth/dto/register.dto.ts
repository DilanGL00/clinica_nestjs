import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateOdontologoDto } from 'src/odontologos/dto/create-odontologo.dto';
import { CreatePacienteDto } from 'src/pacientes/dto/create-paciente.dto';
import { Role } from '../../common/enums/user-role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ValidateNested()
  @Type(() => CreatePacienteDto)
  pacienteData?: CreatePacienteDto;

  @ValidateNested()
  @Type(() => CreateOdontologoDto)
  odontologoData?: CreateOdontologoDto;
}
