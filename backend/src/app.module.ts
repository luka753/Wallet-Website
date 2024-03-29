import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot(
        'mongodb+srv://tskhomelidzel:9nSkwx86J3WFpHDl@cluster0.kddojdd.mongodb.net/?retryWrites=true&w=majority',
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
