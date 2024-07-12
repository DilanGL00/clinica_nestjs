import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto } from './create-cita.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateCitaDto extends PartialType(CreateCitaDto) {
  @IsOptional()
  @IsDate()
  hora_inicio?: Date;

  @IsOptional()
  @IsString()
  duracion?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
