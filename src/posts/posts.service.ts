/* eslint-disable */
// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post, PostDocument } from '../users/schemas/post.schema';
// import { User, UserDocument } from '../users/schemas/user.schema';

// @Injectable()
// export class PostsService {
//   constructor(
//     @InjectModel(Post.name) private postModel: Model<PostDocument>,
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//   ) {}

//   async findAll() {
//     return this.postModel.find().populate('user').exec();
//   }

//   async findOne(id: string) {
//     const post = await this.postModel.findById(id).populate('user').exec();
//     if (!post) {
//       throw new NotFoundException('Post not found');
//     }
//     return post;
//   }

//   async create(createPostDto: any, user: any) {
//     const userEntity = await this.userModel.findById(user.sub).exec();
//     if (!userEntity) {
//       throw new UnauthorizedException('User not authorized');
//     }
//     createPostDto.user = userEntity._id;
//     const createdPost = new this.postModel(createPostDto);
//     return await createdPost.save();
//   }

//   async remove(id: string) {
//     const post = await this.postModel.findByIdAndDelete(id).exec();
//     if (!post) {
//       throw new NotFoundException('Post not found');
//     }
//     return post;
//   }

//   async likePost(id: string) {
//     const post = await this.postModel.findById(id).exec();
//     if (!post) {
//       throw new NotFoundException('Post not found');
//     }
//     post.likes += 1;
//     return post.save();
//   }

//   async unlikePost(id: string) {
//     const post = await this.postModel.findById(id).exec();
//     if (!post) {
//       throw new NotFoundException('Post not found');
//     }
//     if (post.likes > 0) {
//       post.likes -= 1;
//     }
//     return post.save();
//   }

//   async addComment(id: string, comment: { comment: string }, user: any) {
//     const post = await this.postModel.findById(id).exec();
//     if (!post) {
//       throw new NotFoundException('Post not found');
//     }
//     const userEntity = await this.userModel.findById(user.sub).exec();
//     if (!userEntity) {
//       throw new NotFoundException('User not found');
//     }
//     const commentWithTimestamp = {
//       ...comment,
//       createdAt: new Date(),
//       user: {
//         _id: userEntity._id,
//         name: userEntity.name,
//         email: userEntity.email,
//         profilePic: userEntity.profilePic,
//         createdAt: userEntity.createdAt,
//       }
//     };
//     post.comments.push(commentWithTimestamp);
//     return post.save();
//   }
// }

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../users/schemas/post.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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

  async create(createPostDto: any, user: any) {
    const userEntity = await this.userModel.findById(user.sub).exec();
    if (!userEntity) {
      throw new UnauthorizedException('User not authorized');
    }
    createPostDto.user = userEntity._id;
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

  async likePost(id: string, user: any) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (!post.likedBy.includes(user.sub)) {
      post.likes += 1;
      post.likedBy.push(user.sub);
    }
    return post.save();
  }

  async unlikePost(id: string, user: any) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const userIndex = post.likedBy.indexOf(user.sub);
    if (userIndex !== -1) {
      post.likes -= 1;
      post.likedBy.splice(userIndex, 1);
    }
    return post.save();
  }

  async addComment(id: string, comment: { comment: string }, user: any) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const userEntity = await this.userModel.findById(user.sub).exec();
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    const commentWithTimestamp = {
      user: Object(userEntity._id),
      comment: comment.comment,
      createdAt: new Date(),
    };
    post.comments.push(commentWithTimestamp);
    return post.save();
  }
}
