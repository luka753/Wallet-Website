import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User, UserSchema } from 'src/schema/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/service/app.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
  ]),],
  controllers: [UsersController],
  providers: [UsersService, AppService]
})
export class UsersModule {}
