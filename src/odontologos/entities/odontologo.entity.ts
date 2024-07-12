import { Horario } from 'src/horarios/entities/horario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('odontologos')
export class Odontologo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nombre_usuario: string;

  @Column({ type: 'varchar', length: 50 })
  correo_electronico: string;

  @Column({ type: 'varchar' })
  contraseña: string;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar' })
  especialidad: string;

  @OneToMany(() => Horario, (horario) => horario.odontologo)
  horario: Horario[];
}
