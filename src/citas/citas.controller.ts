import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.createCita(createCitaDto);
  }

  @Get()
  findAll() {
    return this.citasService.findAllCitas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOneCita(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.updateCita(+id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.removeCita(+id);
  }

  // Add the following endpoints to CitasController
  @Get('paciente/:id_paciente')
  findCitasByPaciente(@Param('id_paciente') id_paciente: number) {
    return this.citasService.findCitasByPaciente(id_paciente);
  }

  @Get('odontologo/:id_odontologo')
  findCitasByOdontologo(@Param('id_odontologo') id_odontologo: number) {
    return this.citasService.findCitasByOdontologo(id_odontologo);
  }
}
