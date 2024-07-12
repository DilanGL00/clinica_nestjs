import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PacientesModule } from './pacientes/pacientes.module';
import { OdontologosModule } from './odontologos/odontologos.module';
import { HorariosModule } from './horarios/horarios.module';
import { CitasModule } from './citas/citas.module';
import { Odontologo } from './odontologos/entities/odontologo.entity';
import { Paciente } from './pacientes/entities/paciente.entity';
import { Cita } from './citas/entities/cita.entity';
import { Horario } from './horarios/entities/horario.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.fuppaergjhuxdjwefaut',
      password: 'Estehaim123',
      database: 'postgres',
      entities: [Odontologo, Paciente, Cita, Horario],
      synchronize: false,
      logging: true,
    }),
    PacientesModule,
    OdontologosModule,
    HorariosModule,
    CitasModule,
    AuthModule,
  ],
})
export class AppModule {}
