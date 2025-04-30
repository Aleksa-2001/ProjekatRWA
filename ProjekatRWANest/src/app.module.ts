import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KomponenteController } from './komponente/komponente.controller';
import { KomponenteService } from './komponente/komponente.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProdavniceController } from './prodavnice/prodavnice.controller';
import { ProdavniceService } from './prodavnice/prodavnice.service';
import { ProizvodiController } from './proizvodi/proizvodi.controller';
import { ProizvodiService } from './proizvodi/proizvodi.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController, KomponenteController, ProdavniceController, ProizvodiController],
  providers: [
    AppService, 
    KomponenteService, 
    ProdavniceService, ProizvodiService
  ],
})
export class AppModule {}
