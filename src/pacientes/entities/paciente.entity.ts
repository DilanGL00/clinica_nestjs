import { Cita } from 'src/citas/entities/cita.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre_usuario: string;

  @Column({ type: 'varchar' })
  correo_electronico: string;

  @Column({ type: 'varchar' })
  contraseña: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar' })
  telefono: string;

  @OneToMany(() => Cita, (cita) => cita.paciente)
  cita: Cita[];
}
