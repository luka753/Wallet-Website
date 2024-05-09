import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import {PassportModule} from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { AppService } from 'src/service/app.service'; 
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/schema/User.schema';

import { SessionSerializer } from './utils/SessionSerializer';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
]),],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },{
    provide: 'USERS_SERVICE',
    useClass: UsersService
    },
    SessionSerializer,
    LocalStrategy
]
})
export class AuthModule {}
