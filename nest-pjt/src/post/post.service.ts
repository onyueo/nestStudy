import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  private userInclude = {
      select: {
        id: true,
        nickname: true,
      }
  }

  async create(createPostDto: CreatePostDto) {
    const {userId, ...data} =  createPostDto
    try {
      const post = await this.prismaService.post.create({
        data: {
          userId, ...data
        }
      })
      return post;
    } catch (error) {
      throw new InternalServerErrorException('포스트 생성이 안되는뎁쇼')
    }
  }

  async findAll() {
    const posts = await this.prismaService.post.findMany({
      include: {
        user : this.userInclude
      }
    })
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id
      },
      include: {
        user : this.userInclude,
        comments: {
          select: {
            user : this.userInclude,
            id: true,
            userId: true,
            content: true,
          }
        }
      }
    })
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const postUpdate = await this.prismaService.post.update({
      where: {
        id
      },
      data: {
        ...updatePostDto
      }
    })
    return postUpdate;
  }

  async remove(id: number) {
    const deletePost = await this.prismaService.post.deleteMany({
      where: {
        id
      }
    })
    return deletePost;
  }

  async findUserPost(userId: number) {
    const findPost = await this.prismaService.post.findMany({
      where: {
        userId
      }
    })
    return findPost
  }


}

