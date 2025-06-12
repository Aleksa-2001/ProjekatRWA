import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';
import { ProizvodDto } from '../dto/proizvod.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProizvodiController {

    constructor(private service: ProizvodiService) { }
    
    //@Get('proizvodi')
    //public getAll() {
    //    return this.service.getAll()
    //}

    @Get('proizvodi/:prodavnicaID')
    public getProizvodi(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProizvodi(prodavnicaID)
    }

    @Get('proizvodi')
    public getProizvodiBySearch(@Query('search') search: string) {
        return this.service.getProizvodiBySearch(search)
    }

    @Get('proizvod/:id')
    public getProizvodByID(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.getProizvodByID(proizvodID)
    }

    @Post('proizvod')
    public addProizvod(@Body() dto: ProizvodDto) {
        return this.service.create(dto)
    }

    @Put('proizvod/:id')
    public updateProizvod(@Param('id', ParseIntPipe) proizvodID: number, @Body() dto: ProizvodDto) {
        return this.service.update(proizvodID, dto)
    }

    @Delete('proizvod/:id')
    public deleteProizvod(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.delete(proizvodID)
    }

    @Delete('proizvodi/:prodavnicaID')
    public deleteProizvodi(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.deleteAll(prodavnicaID)
    }

    @Post('proizvod/upload/:id')
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
