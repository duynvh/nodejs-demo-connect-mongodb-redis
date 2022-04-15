import { injectable } from 'inversify';
import { removeVietnameseTones } from '../utils/helper';
import { UserSchema } from '../models/user';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

const User = mongoose.model('User', UserSchema);
// const redisClient = require('../libs/redis-client');

export interface IUser {
  name: string;
}

@injectable()
export class UserService {
  public async getUsers(): Promise<IUser[]> {
    const users = await User.find();
    return users;
  }

  public async getUser(id: string): Promise<IUser | undefined> {
    let user = null;
    // const rawData = await redisClient.getAsync(id);

    // if (rawData === null) {
    //   user = await User.findById(id);
    //   await redisClient.setAsync(id, JSON.stringify(user));
    // } else {
    //   user = JSON.parse(rawData);
    // }
    user = await User.findById(id);
    return user;
  }

  public async addUser(user: IUser): Promise<void> {
    const newUser = new User(user);
    await newUser.save();
  }

  public async updateUser(id: string, user: IUser): Promise<void> {
    await User.findByIdAndUpdate({ _id: id }, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await User.findByIdAndRemove(id);
  }

  public convertNameOfUser(name: string): string {
    let suffix = '';
    // Remove whitespace
    name = name.trim();
    name = _.replace(name, /\s+/g, ' ');

    const words = name.split(' ');
    const lastName = words[words.length - 1];

    for (let i = 0; i < words.length - 1; i++) {
      suffix += words[i].charAt(0);
    }

    return `${removeVietnameseTones(
      lastName.toLocaleLowerCase()
    )}.${suffix.toLowerCase()}`;
  }
}
