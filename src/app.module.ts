import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './model/user.entity';
import { UserModule } from './user/user.module';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'book_store',
      entities: [User, Book],
      synchronize: true,
    }),
    UserModule,
    ConfigModule.forRoot(),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
