import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './model/user.entity';
import { UserModule } from './user/user.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host is postgres when running with Docker, otherwise use 'localhost'
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
