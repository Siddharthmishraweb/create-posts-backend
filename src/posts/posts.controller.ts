import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: any, @User() user: any) {
    return this.postsService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  async likePost(@Param('id') id: string, @User() user: any) {
    return this.postsService.likePost(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/unlike')
  async unlikePost(@Param('id') id: string, @User() user: any) {
    return this.postsService.unlikePost(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/comment')
  async addComment(@Param('id') id: string, @Body() comment: { comment: string }, @User() user: any) {
    return this.postsService.addComment(id, comment, user);
  }
}
