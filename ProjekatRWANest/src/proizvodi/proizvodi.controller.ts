import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';
import { ProizvodDto } from '../dto/proizvod.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RacunarDto } from 'src/dto/racunar.dto';

@Controller()
export class ProizvodiController {

    constructor(private service: ProizvodiService) { }
    
    @Get('proizvodi')
    public getAll() {
        return this.service.getAll()
    }

    @Get('proizvodi/:prodavnicaID')
    public getProizvodi(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProizvodi(prodavnicaID)
    }

    @Get('proizvodiSearch')
    public getProizvodiBySearch(@Query('query') query: string) {
        return this.service.getProizvodiBySearch(query)
    }

    @Get('proizvod/:id')
    public getProizvodByID(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.getProizvodByID(proizvodID)
    }

    @Post('proizvod')
    @UseGuards(JwtAuthGuard)
    public addProizvod(@Body() dto: ProizvodDto) {
        return this.service.create(dto)
    }

    @Put('proizvod/:id')
    @UseGuards(JwtAuthGuard)
    public updateProizvod(@Param('id', ParseIntPipe) proizvodID: number, @Body() dto: ProizvodDto) {
        return this.service.update(proizvodID, dto)
    }

    @Put('proizvodRacunar/:id')
    @UseGuards(JwtAuthGuard)
    public updateRacunar(@Param('id', ParseIntPipe) racunarID: number, @Body() dto: RacunarDto) {
        return this.service.updateRacunar(racunarID, dto)
    }

    @Delete('proizvod/:id')
    @UseGuards(JwtAuthGuard)
    public deleteProizvod(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.delete(proizvodID)
    }

    @Delete('proizvodi/:prodavnicaID')
    @UseGuards(JwtAuthGuard)
    public deleteProizvodi(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.deleteAll(prodavnicaID)
    }

    @Post('proizvod/upload/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'images/proizvodi',
            filename: (req, file, callback) => {
                const id = req.params.id
                const ext = extname(file.originalname)
                const filename = `${id}${ext}`
                callback(null, filename)
            }
        })
    }))
    public uploadImage(@Param('id', ParseIntPipe) proizvodID: number, @UploadedFile() file: Express.Multer.File) {
        return this.service.upload(proizvodID, file)
    }
}
