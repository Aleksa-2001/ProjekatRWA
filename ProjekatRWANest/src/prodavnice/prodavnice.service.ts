import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodavnica } from '../models/prodavnica.entity';
import { ILike, Repository } from 'typeorm';
import { ProdavnicaDto } from '../dto/prodavnica.dto';
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
        //return await this.prodavnicaRepository.find()

        const prodavnice = await this.prodavnicaRepository
            .createQueryBuilder('prodavnica')
            .leftJoin('prodavnica.recenzije', 'recenzija')
            .select(['prodavnica.id', 'prodavnica.naziv', 'prodavnica.adresa', 'prodavnica.grad', 'prodavnica.slika'])
            .addSelect('COUNT(recenzija)', 'brojRecenzija')
            .addSelect('COALESCE(AVG(recenzija.ocena), 0)', 'prosecna_ocena')
            .groupBy('prodavnica.id')
            .getRawAndEntities()
        
        return prodavnice.entities.map((prodavnica, i) => ({
            ...prodavnica,
            brojRecenzija: parseInt(prodavnice.raw[i].brojRecenzija),
            prosecnaOcena: parseFloat(prodavnice.raw[i].prosecna_ocena)
        }))

        //const prodavnice = await this.prodavnicaRepository.find({
        //    relations: ['recenzije'],
        //    select: {
        //        recenzije: { ocena: true }
        //    }
        //})
        //
        //return prodavnice.map(prodavnica => {
        //    const ocene = prodavnica.recenzije.map(recenzija => recenzija.ocena)
        //    const prosecnaOcena = ocene.length ? ocene.reduce((a, b) => a + b, 0) : 0
        //
        //    return {
        //        ...prodavnica,
        //        prosecnaOcena
        //    }
        //})
    }

    public async getProdavniceBySearch(search: string) {
        //return await this.prodavnicaRepository.findBy({
        //    naziv: ILike(`%${search.toLowerCase()}%`)
        //})

        if (search) {
            const prodavnice = await this.prodavnicaRepository
                .createQueryBuilder('prodavnica')
                .leftJoin('prodavnica.recenzije', 'recenzija')
                .select(['prodavnica.id', 'prodavnica.naziv', 'prodavnica.adresa', 'prodavnica.grad', 'prodavnica.slika'])
                .addSelect('COUNT(recenzija)', 'brojRecenzija')
                .addSelect('COALESCE(AVG(recenzija.ocena), 0)', 'prosecnaOcena')
                .groupBy('prodavnica.id')
                .where('prodavnica.naziv ILIKE :search', { search: `%${search}%` })
                .orWhere('prodavnica.adresa ILIKE :search', { search: `%${search}%` })
                .orWhere('prodavnica.grad ILIKE :search', { search: `%${search}%` })
                .getRawAndEntities()
            
            return prodavnice.entities.map((prodavnica, i) => ({
                ...prodavnica,
                brojRecenzija: parseInt(prodavnice.raw[i].brojRecenzija),
                prosecnaOcena: parseFloat(prodavnice.raw[i].prosecnaOcena)
            }))
        }
        else throw new BadRequestException("Molimo da popunite polje za pretragu!")
    }

    public async getProdavniceRecommended() {
        const prodavnice = await this.prodavnicaRepository
            .createQueryBuilder('prodavnica')
            .leftJoin('prodavnica.recenzije', 'recenzija')
            .select(['prodavnica.id', 'prodavnica.naziv', 'prodavnica.adresa', 'prodavnica.grad', 'prodavnica.slika'])
            .addSelect('COUNT(recenzija)', 'brojRecenzija')
            .addSelect('COALESCE(AVG(recenzija.ocena), 0)', 'prosecna_ocena')
            .groupBy('prodavnica.id')
            .orderBy('prosecna_ocena', 'DESC')
            .addOrderBy('COUNT(recenzija)', 'DESC')
            .limit(4)
            .getRawAndEntities()
        
        return prodavnice.entities.map((prodavnica, i) => ({
            ...prodavnica,
            brojRecenzija: parseInt(prodavnice.raw[i].brojRecenzija),
            prosecnaOcena: parseFloat(prodavnice.raw[i].prosecna_ocena)
        }))
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
