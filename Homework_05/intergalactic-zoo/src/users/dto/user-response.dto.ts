import { Role } from 'src/enums/role.enum';

export class UserResponseDto {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
