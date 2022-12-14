import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UserModule, JwtModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
