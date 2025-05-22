import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProdavniceController } from './prodavnice/prodavnice.controller';
import { ProdavniceService } from './prodavnice/prodavnice.service';
import { ProizvodiController } from './proizvodi/proizvodi.controller';
import { ProizvodiService } from './proizvodi/proizvodi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { ProdavniceModule } from './prodavnice/prodavnice.module';
import { ProizvodiModule } from './proizvodi/proizvodi.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProdavniceModule, 
    ProizvodiModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
