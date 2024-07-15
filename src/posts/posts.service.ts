/* eslint-disable */
// posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../users/schemas/post.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,  @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return this.postModel.find().populate('user').exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).populate('user').exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(createPostDto: any) {
    console.log("createPostDto:: ", createPostDto);
    const user = await this.userModel.findOne({ email: createPostDto.user }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    createPostDto.user = user._id;
    const createdPost = new this.postModel(createPostDto);
    return await createdPost.save();
  }

  async remove(id: string) {
    const post = await this.postModel.findByIdAndDelete(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async likePost(id: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.likes += 1;
    return post.save();
  }

  async unlikePost(id: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.likes > 0) {
      post.likes -= 1;
    }
    return post.save();
  }

  async addComment(id: string, comment: { user: string, comment: string }) {
    const post = await (await this.postModel.findById(id).populate('user'));
    const user = await this.userModel.findOne({ _id: Object(comment.user) }).exec();
    console.log("user::: ", user)
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const commentWithTimestamp = { ...comment, createdAt: new Date() , ...user};
    console.log("commentWithTimestamp:: ", commentWithTimestamp)
    post.comments.push(commentWithTimestamp);
    return post.save();
  }
}
