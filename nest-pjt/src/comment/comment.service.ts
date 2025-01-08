import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createCommentDto: CreateCommentDto) {
    const data = createCommentDto
    try {
      const comment = await this.prismaService.comment.create({
        data
      })
      return comment;
    } catch (error) {
      throw new InternalServerErrorException('댓글 생성 안됨')
    }
  }

  async findAll() {
    const comments = await this.prismaService.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          }
        }
      }
    })
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          }
        }
      }
    })
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updateComment = await this.prismaService.comment.updateMany({
      where: {
        id
      },
      data: {
        ...updateCommentDto
      }
    })
    return updateComment;
  }

  async remove(id: number) {
    const deleteComment = await this.prismaService.comment.deleteMany({
      where: {
        id
      }
    })
    return deleteComment;
  }
}
