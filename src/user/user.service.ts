import { Injectable } from '@nestjs/common';
import { EditUserInterface } from '../interfaces/editUser.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserInterface) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;

    return user;
  }
}
