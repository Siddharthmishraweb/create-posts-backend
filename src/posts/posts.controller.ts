/* eslint-disable */

// posts.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService
) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: any) {
    return this.postsService.create(createPostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Patch(':id/like')
  async likePost(@Param('id') id: string) {
    return this.postsService.likePost(id);
  }

  @Patch(':id/unlike')
  async unlikePost(@Param('id') id: string) {
    return this.postsService.unlikePost(id);
  }

  @Patch(':id/comment')
  async addComment(@Param('id') id: string, @Body() comment: { user: string, comment: string }) {
    return this.postsService.addComment(id, comment);
  }
}
