import { forwardRef, Module } from '@nestjs/common';
import { RecenzijeController } from './recenzije.controller';
import { RecenzijeService } from './recenzije.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recenzija } from 'src/models/recenzija.entity';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';
import { ProizvodiModule } from 'src/proizvodi/proizvodi.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        forwardRef(() => UsersModule), 
        forwardRef(() => ProdavniceModule), 
        forwardRef(() => ProizvodiModule), 
        TypeOrmModule.forFeature([Recenzija])
    ],
    controllers: [RecenzijeController],
    providers: [RecenzijeService],
    exports: [TypeOrmModule]
})
export class RecenzijeModule {}
