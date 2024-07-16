/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOrCreateByGoogle(profile: any): Promise<User> {
    let user = await this.userModel.findOne({ email: profile.email }).exec();
    if (!user) {
      user = new this.userModel({
        email: profile.email,
        name: profile.name,
        profilePic: profile.photoUrl,
      });
      await user.save();
    }
    return user;
  }
}

