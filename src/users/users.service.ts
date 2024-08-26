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
    page: number,
    limit: number,
    gender?: string,
    status?: string,
  ): Promise<{ totalResult: number; results: Users[] }> {
    const query: any = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
      ],
    };

    if (gender && gender !== '') {
      query.gender = gender;
    }

    if (status && status !== '') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const results = await this.usersModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalResult = await this.usersModel.countDocuments(query).exec();

    return { totalResult, results };
  }

  async totalUsers(
    keyword: string,
    gender?: string,
    status?: string,
  ): Promise<{ totalResult: number }> {
    const query: any = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
      ],
    };

    if (gender && gender !== '') {
      query.gender = gender;
    }

    if (status && status !== '') {
      query.status = status;
    }

    const totalResult = await this.usersModel.countDocuments(query).exec();
    return { totalResult };
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
    return await this.usersModel.findByIdAndDelete(id).exec();
  }
}
