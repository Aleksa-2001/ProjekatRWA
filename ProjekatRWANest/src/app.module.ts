import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { ProdavniceModule } from './prodavnice/prodavnice.module';
import { ProizvodiModule } from './proizvodi/proizvodi.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RecenzijeModule } from './recenzije/recenzije.module';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProdavniceModule, 
    ProizvodiModule, 
    RecenzijeModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '../..', 'images'), 
      serveRoot: '/images'
    }),
    RecenzijeModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
