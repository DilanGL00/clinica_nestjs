import { PartialType } from '@nestjs/mapped-types';
import { CreateOdontologoDto } from './create-odontologo.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateOdontologoDto extends PartialType(CreateOdontologoDto) {
  @IsOptional()
  @IsString()
  nombre_usuario?: string;

  @IsOptional()
  @IsEmail()
  correo_electronico?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  contraseña?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;
}
