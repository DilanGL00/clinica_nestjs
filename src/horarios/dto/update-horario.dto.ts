import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioDto } from './create-horario.dto';
import { IsDateString, IsOptional, Matches } from 'class-validator';

export class UpdateHorarioDto extends PartialType(CreateHorarioDto) {
  @IsOptional()
  id_odontologo?: number;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'hora_inicio debe estar en el formato HH:MM:SS',
  })
  hora_inicio?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'hora_inicio debe estar en el formato HH:MM:SS',
  })
  hora_fin?: string;

  @IsOptional()
  @IsDateString()
  fecha?: Date;
}
