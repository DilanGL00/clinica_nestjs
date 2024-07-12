import { Horario } from 'src/horarios/entities/horario.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.cita)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @ManyToOne(() => Horario, (horario) => horario.cita)
  @JoinColumn({ name: 'id_horario' })
  horario: Horario;

  @Column({ type: 'date' })
  hora_inicio: Date;

  @Column({ type: 'varchar' })
  duracion: string;

  @Column({ type: 'varchar' })
  estado: string;
}
