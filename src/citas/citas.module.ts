import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { HorariosModule } from 'src/horarios/horarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cita]), PacientesModule, HorariosModule],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
