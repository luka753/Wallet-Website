import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/schema/User.schema';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  private localCache = {}

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  
  ) {}

  async checkUsersExistence(ComingEmail) {
    const saved = await this.findUserByEmail(ComingEmail);
    if (!saved) return false;
    if (saved.email == ComingEmail) {
      return true;
    }
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (await this.checkUsersExistence(createUserDto.email)) {
      throw new Error('User already exists');
    } else {
      const password = encodePassword(createUserDto.password);
      const [newUser] = await Promise.all([
        new this.userModel({ ...createUserDto, password }),
      ]);
      return newUser.save();
    }
  }
  
}
