import { IsDateString, IsNotEmpty, Matches } from 'class-validator';

export class CreateHorarioDto {
  @IsNotEmpty()
  id_odontologo: number;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'hora_inicio debe estar en el formato HH:MM:SS',
  })
  hora_inicio: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'hora_inicio debe estar en el formato HH:MM:SS',
  })
  hora_fin: string;

  @IsNotEmpty()
  @IsDateString()
  fecha: Date;
}
