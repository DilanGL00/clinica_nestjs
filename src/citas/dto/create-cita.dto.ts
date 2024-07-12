import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsNotEmpty()
  id_paciente: number;

  @IsNotEmpty()
  id_horario: number;

  @IsNotEmpty()
  @IsDate()
  hora_inicio: Date;

  @IsNotEmpty()
  @IsString()
  duracion: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}
