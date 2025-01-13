import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const createPost = await this.postService.create(createPostDto) 
    return createPost;
  }

  @Get()
  async findAll() {
    const allPosts = await this.postService.findAll()
    return allPosts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(+id)
    return post;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const updatePost = await this.postService.update(+id, updatePostDto)
    return updatePost;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletePost = await this.postService.remove(+id)
    return deletePost;
  }
}
