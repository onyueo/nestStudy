import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const createComment = await this.commentService.create(createCommentDto)
    return createComment;
  }

  @Get()
  async findAll() {
    const allComments = await this.commentService.findAll()
    return allComments;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentService.findOne(+id)
    return comment;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    const updateComment = await this.commentService.update(+id, updateCommentDto)
    return updateComment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteComment = await this.commentService.remove(+id)
    return deleteComment;
  }
}
