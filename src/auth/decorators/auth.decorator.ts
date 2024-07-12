import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/user-role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: Role) {
  //applyDecorators junta mas de un decorador
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
