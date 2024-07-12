import { Cita } from 'src/citas/entities/cita.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Odontologo, (odontologo) => odontologo.horario)
  @JoinColumn({ name: 'id_odontologo' })
  odontologo: Odontologo;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({ type: 'date' })
  fecha: Date;

  @OneToMany(() => Cita, (cita) => cita.horario)
  cita: Cita[];
}
