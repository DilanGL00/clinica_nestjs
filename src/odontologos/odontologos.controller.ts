import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OdontologosService } from './odontologos.service';
import { CreateOdontologoDto } from './dto/create-odontologo.dto';
import { UpdateOdontologoDto } from './dto/update-odontologo.dto';

@Controller('odontologos')
@UsePipes(new ValidationPipe())
export class OdontologosController {
  constructor(private readonly odontologosService: OdontologosService) {}

  @Post()
  create(@Body() createOdontologoDto: CreateOdontologoDto) {
    return this.odontologosService.createOdontologo(createOdontologoDto);
  }

  @Get()
  findAll() {
    return this.odontologosService.findAllOdontologos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odontologosService.viewOdontologo(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOdontologoDto: UpdateOdontologoDto,
  ) {
    return this.odontologosService.updateOdontologo(+id, updateOdontologoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odontologosService.removeOdontologo(+id);
  }
}
