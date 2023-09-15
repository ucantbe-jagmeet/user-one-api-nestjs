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

  async findAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
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
