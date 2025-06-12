import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProdavniceService } from './prodavnice.service';
import { ProdavnicaDto } from '../dto/prodavnica.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProdavniceController {

    constructor(private service: ProdavniceService) { }

    @Get('prodavnice')
    public getProdavnice() {
        return this.service.getProdavnice()
    }

    @Get('prodavnice/:search')
    public getProdavniceBySearch(@Param('search') search: string) {
        return this.service.getProdavniceBySearch(search)
    }

    @Get('prodavnica/:id')
    public getProdavnicaByID(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProdavnicaByID(prodavnicaID)
    }

    @Post('prodavnica')
    public addProdavnica(@Body() dto: ProdavnicaDto) {
        return this.service.create(dto)
    }
    
    @Put('prodavnica/:id')
    public updateProdavnica(@Param('id', ParseIntPipe) prodavnicaID: number, @Body() dto: ProdavnicaDto) {
        return this.service.update(prodavnicaID, dto)
    }

    @Delete('prodavnica/:id')
    public deleteProdavnica(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.delete(prodavnicaID)
    }

    @Post('prodavnica/upload/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'images/prodavnice',
            filename: (req, file, callback) => {
                const id = req.params.id
                const ext = extname(file.originalname)
                const filename = `${id}${ext}`
                callback(null, filename)
            }
        })
    }))
    public uploadImage(@Param('id', ParseIntPipe) prodavnicaID: number, @UploadedFile() file: Express.Multer.File) {
        return this.service.upload(prodavnicaID, file)
    }
}
