import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User.schema';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      MongooseModule.forRoot(
        'mongodb+srv://tskhomelidzel:XfJRjr7czSgBg8kI@cluster0.kddojdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ),
      MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}
      ]),
      PassportModule.register({ session: true }),
      ScheduleModule.forRoot(),
      AuthModule,
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
