import { Body, Controller, HttpStatus, Post, Res,Request ,Get, UseGuards, Query} from '@nestjs/common';
// import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { AppService } from '../../../service/app.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly appService: AppService) {}

 

  @Post('/user')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto, @Request() req) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      // req.login(createUserDto, (err)=> err)
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `${err}!`,
        error: 'Bad Request',
      });
    }
  }


}
