import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    Logger.debug(`유저생성 : ${user.name} / ${user.email} / ${user.password}`)
    return user
  }

  @Get()
  async findAll() {
    const getUser = await this.userService.findAll()
    Logger.debug(`모든유저 조회 : ${getUser}`)
    return getUser;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const getSingleUser = await this.userService.findOne(+id)
    return getSingleUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.userService.update(+id, updateUserDto)
    return updateUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteUser = await this.userService.remove(+id)
    return deleteUser;
  }
}
