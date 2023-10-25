import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/model/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.usersModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(
    keyword: string,
  ): Promise<{ totalResult: number; results: Users[] }> {
    if (typeof keyword !== 'string') {
      return { totalResult: 0, results: [] };
    }
    const query = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
      ],
    };
    const results = await this.usersModel.find({ $and: [query] }).exec();
    const totalResult = results.length;

    return { totalResult, results };
  }

  async findOne(id: string) {
    return await this.usersModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.usersModel.findByIdAndRemove(id).exec();
  }
}
