import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createUserDto: CreateUserDto) {
    const data = {...createUserDto}
    const user = await this.prismaService.user.create({
      data
    })
    return user;
  }

  async findAll() {
    const user = await this.prismaService.user.findMany()
    return user;
  }

  async findOne(id: number) {
    const singleUser = await this.prismaService.user.findUnique({
      where: {
        id
      },
      include: {
        posts: true,
        comments: true,
      }
    })
    return singleUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prismaService.user.updateMany({
      where: {
        id
      },
      data: {
        ...updateUserDto
      }
    })
    return updateUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prismaService.user.deleteMany({
      where: {
        id
      }
    })
    return deleteUser;
  }
}
