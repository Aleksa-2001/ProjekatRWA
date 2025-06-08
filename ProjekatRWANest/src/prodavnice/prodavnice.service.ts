import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodavnica } from './entities/prodavnica.entity';
import { ILike, Repository } from 'typeorm';
import { ProdavnicaDto } from './entities/prodavnica.dto';
import { ProizvodiService } from 'src/proizvodi/proizvodi.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProdavniceService {
    
    constructor(
        @InjectRepository(Prodavnica) private prodavnicaRepository: Repository<Prodavnica>, 
        private proizvodiService: ProizvodiService
    ) { }

    public async getProdavnice() {
        return await this.prodavnicaRepository.find()
    }

    public async getProdavniceBySearch(search: string) {
        return await this.prodavnicaRepository.findBy({
            naziv: ILike(`%${search.toLowerCase()}%`)
        })
    }

    public async getProdavnicaByID(prodavnicaID: number) {
        if (await this.prodavnicaRepository.existsBy({ id: prodavnicaID }))
            return await this.prodavnicaRepository.findOneBy({ id: prodavnicaID })
        else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nije pronadjena!`)
    }

    public async create(prodavnicaDto: ProdavnicaDto) {
        const prodavnica = this.prodavnicaRepository.create(prodavnicaDto)
        return await this.prodavnicaRepository.save(prodavnica)
    }

    public async update(prodavnicaID: number, prodavnicaDto: ProdavnicaDto) {
        if (await this.prodavnicaRepository.existsBy({ id: prodavnicaID })) {
            const prodavnica = await this.prodavnicaRepository.findOneBy({ id: prodavnicaID })
            return await this.prodavnicaRepository.update(prodavnicaID, prodavnicaDto).then(res => {
                if (res.affected === 1) {
                    if (!prodavnicaDto.slika && prodavnica.slika) {
                        const putanja = join(__dirname, '..', '..', '..', prodavnica.slika)
                        if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                    }
                    return this.getProdavnicaByID(prodavnicaID)
                }
            })
        }
        else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nije pronadjena!`)
    }

    public async delete(prodavnicaID: number) {
        if (await this.prodavnicaRepository.existsBy({ id: prodavnicaID })) {
            const prodavnica = await this.prodavnicaRepository.findOneBy({ id: prodavnicaID })
            this.proizvodiService.deleteAll(prodavnicaID)
            return await this.prodavnicaRepository.delete(prodavnicaID).then(res => {
                if (res.affected === 1) {
                    if (prodavnica.slika) {
                        const putanja = join(__dirname, '..', '..', '..', prodavnica.slika)
                        if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                    }
                    return prodavnicaID
                }
            })
        }
        else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nije pronadjena!`)
    }

    public async upload(prodavnicaID: number, file: Express.Multer.File) {
        if (await this.prodavnicaRepository.existsBy({ id: prodavnicaID }) && file) {
            return { prodavnicaID: prodavnicaID, path: `${file.destination}/${file.filename}` }
        }
        else throw new BadRequestException('Slika nije upload-ovana!')
    }
}
