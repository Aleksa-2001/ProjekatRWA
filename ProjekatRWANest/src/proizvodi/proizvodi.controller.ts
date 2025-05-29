import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceService } from 'src/prodavnice/prodavnice.service';
import { ProizvodDto } from './entities/proizvod.dto';
import { CPUDto } from './entities/komponente/cpu.dto';
import { GPUDto } from './entities/komponente/gpu.dto';
import { RAMDto } from './entities/komponente/ram.dto';

export type ProizvodTypeDto = 
    CPUDto |
    GPUDto |
    RAMDto

@Controller()
export class ProizvodiController {

    constructor(private service: ProizvodiService, private prodavniceService: ProdavniceService) { }
    
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
    public addProizvod(@Body() dto: ProizvodTypeDto) {
        switch (dto.type) {
            case 'Racunar':
                return "Racunar"
            case 'RacunarskaKomponenta':
                return "RacunarskaKomponenta"
            case "CPU":
                return this.service.createCPU(dto as CPUDto)
            case "GPU":
                return this.service.createGPU(dto as GPUDto)
            case "RAM":
                return this.service.createRAM(dto as RAMDto)
            default:
                throw new BadRequestException('Tip proizvoda nije prepoznat')
        }
    }
    
    @Put('proizvod/:id')
    public updateProizvod(@Param('id', ParseIntPipe) proizvodID: number, @Body() dto: ProizvodTypeDto) {
        switch (dto.type) {
            case 'Racunar':
                return "Racunar"
            case 'RacunarskaKomponenta':
                return "RacunarskaKomponenta"
            case "CPU":
                return this.service.updateCPU(proizvodID, dto as CPUDto)
            case "GPU":
                return this.service.updateGPU(proizvodID, dto as GPUDto)
            case "RAM":
                return this.service.updateRAM(proizvodID, dto as RAMDto)
            default:
                throw new BadRequestException('Tip proizvoda nije prepoznat')
        }
    }

    @Delete('proizvod/:id')
    public deleteProizvod(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.delete(proizvodID)
    }
}
