import { Transform } from 'class-transformer';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/user-role.enum';

export class LoginDto {
  @IsString()
  nombre_usuario: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsEnum(Role)
  role: Role;
}
