import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { Horario } from 'src/horarios/entities/horario.entity';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.createCitas(createCitaDto);
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

  //nuevos metodos

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.PACIENTE)
  @Post()
  createCitaBypaciente(@Body() createCitaDto: CreateCitaDto, @Request() req) {
    return this.citasService.createCitaByPaciente(createCitaDto, req.user.id);
  }

  @Get('/horarios-disponibles')
  async getHorariosDisponibles(): Promise<Horario[]> {
    return this.citasService.getHorariosDisponibles();
  }
}
