import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { Horario } from './entities/horario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontologosModule } from 'src/odontologos/odontologos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]), OdontologosModule],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [TypeOrmModule.forFeature([Horario])],
})
export class HorariosModule {}
