import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    try {
      return await this.postModel.find().populate('user').populate('comments.user').exec();
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.postModel.findById(id).populate('user').populate('comments.user').exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Error fetching post');
    }
  }

  async create(createPostDto: any, user: any) {
    try {
      console.log("hooooooooooooooooo", user)
      const userEntity = await this.userModel.findById(user.sub).exec();
      console.log("user:: ", user);
      if (!userEntity) {
        throw new UnauthorizedException('User not authorized');
      }
      createPostDto.user = userEntity._id;
      const createdPost = new this.postModel(createPostDto);
      return await createdPost.save();
    } catch (error) {
      throw new Error('Error creating post');
    }
  }

  async remove(id: string) {
    try {
      const post = await this.postModel.findByIdAndDelete(id).exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Error deleting post');
    }
  }

  async likePost(id: string, user: any) {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      if (!post.likedBy.includes(user.sub)) {
        post.likes += 1;
        post.likedBy.push(user.sub);
      }
      return await post.save();
    } catch (error) {
      throw new Error('Error liking post');
    }
  }

  async unlikePost(id: string, user: any) {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      const userIndex = post.likedBy.indexOf(user.sub);
      if (userIndex !== -1) {
        post.likes -= 1;
        post.likedBy.splice(userIndex, 1);
      }
      return await post.save();
    } catch (error) {
      throw new Error('Error unliking post');
    }
  }

  async addComment(id: string, comment: { comment: string }, user: any) {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      const userEntity = await this.userModel.findById(user.sub).exec();
      console.log("userEntity::  ", userEntity)
      if (!userEntity) {
        throw new NotFoundException('User not found');
      }
      const commentWithTimestamp = {
        user: Object(userEntity._id),
        comment: comment.comment,
        createdAt: new Date(),
      };
      post.comments.push(commentWithTimestamp);
      await post.save();
      return post.populate('comments.user')
       
    } catch (error) {
      throw new Error('Error adding comment');
    }
  }
}
