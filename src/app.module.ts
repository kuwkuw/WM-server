
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TODO : replace by typegoose 
    MongooseModule.forRoot(`mongodb+srv://mw-server:${process.env.DB_PASS}@cluster0-dob5z.azure.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule,
    UsersModule,
    WordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
