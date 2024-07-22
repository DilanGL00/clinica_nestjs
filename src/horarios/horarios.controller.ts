import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/common/enums/user-role.enum';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.createHorario(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.horariosService.findAllHorarios();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horariosService.findOneHorario(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horariosService.updateHorario(+id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horariosService.removeHorario(+id);
  }

  ///roles

  @Get('/disponibles')
  async getHorariosDisponibles(): Promise<Horario[]> {
    return this.horariosService.getHorariosDisponibles();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ODONTOLOGO)
  @Post('/registerHorario')
  async createHorarioByOdontologo(
    @Body() createHorarioDto: CreateHorarioDto,
    @Req() req,
  ): Promise<Horario> {
    const id_odontologo = req.user.id;
    return this.horariosService.createHorarioByLogin(
      createHorarioDto,
      id_odontologo,
    );
  }
}
