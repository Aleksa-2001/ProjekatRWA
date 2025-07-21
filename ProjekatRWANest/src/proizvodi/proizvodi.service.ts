import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { ProizvodDto } from '../dto/proizvod.dto';
import { Proizvod } from '../models/proizvod.entity';
import { Racunar } from 'src/models/racunar.entity';
import { RacunarDto } from 'src/dto/racunar.dto';
import { Skladiste } from 'src/models/komponente/skladiste.entity';

@Injectable()
export class ProizvodiService {

    constructor(
        @InjectRepository(Proizvod) private proizvodRepository: Repository<Proizvod>, 
        @InjectRepository(Racunar) private racunarRepository: Repository<Racunar>, 
        @InjectRepository(Skladiste) private skladisteRepository: Repository<Skladiste>
    ) { }

    public async getAll() {
        return await this.proizvodRepository.find()
    }

    public async getProizvodi(prodavnicaID: number) {
        //return await this.proizvodRepository.find({ 
        //    where: { prodavnica: { id: prodavnicaID } }
        //})
        
        const proizvodi = await this.proizvodRepository
            .createQueryBuilder('proizvod')
            .leftJoin('proizvod.recenzije', 'recenzija')
            .select(['proizvod.id', 'proizvod.type', 'proizvod.tipProizvoda', 'proizvod.proizvodjac', 'proizvod.naziv', 'proizvod.cena', 'proizvod.slika'])
            .addSelect('COUNT(recenzija)', 'brojRecenzija')
            .addSelect('COALESCE(AVG(recenzija.ocena), 0)', 'prosecnaOcena')
            .groupBy('proizvod.id')
            .where('proizvod.prodavnica.id = :id', { id: prodavnicaID })
            .getRawAndEntities()
        
        return proizvodi.entities.map((proizvod, i) => ({
            ...proizvod,
            brojRecenzija: parseInt(proizvodi.raw[i].brojRecenzija),
            prosecnaOcena: parseFloat(proizvodi.raw[i].prosecnaOcena)
        }))
    }

    public async getProizvodiBySearch(search: string) {
        //return await this.proizvodRepository.findBy(
        //    [
        //        { proizvodjac: ILike(`%${search.toLowerCase()}%`) }, 
        //        { naziv: ILike(`%${search.toLowerCase()}%`) }, 
        //        { type: ILike(`%${search.toLowerCase()}%`) }
        //    ]
        //)

        if (search) {
            const proizvodi = await this.proizvodRepository
                .createQueryBuilder('proizvod')
                .leftJoin('proizvod.recenzije', 'recenzija')
                .select(['proizvod.id', 'proizvod.type', 'proizvod.tipProizvoda', 'proizvod.proizvodjac', 'proizvod.naziv', 'proizvod.cena', 'proizvod.slika'])
                .addSelect('COUNT(recenzija)', 'brojRecenzija')
                .addSelect('COALESCE(AVG(recenzija.ocena), 0)', 'prosecnaOcena')
                .groupBy('proizvod.id')
                .where('proizvod.proizvodjac ILIKE :search', { search: `%${search}%` })
                .orWhere('proizvod.naziv ILIKE :search', { search: `%${search}%` })
                .orWhere('proizvod.type ILIKE :search', { search: `%${search}%` })
                .getRawAndEntities()
            
            return proizvodi.entities.map((proizvod, i) => ({
                ...proizvod,
                brojRecenzija: parseInt(proizvodi.raw[i].brojRecenzija),
                prosecnaOcena: parseFloat(proizvodi.raw[i].prosecnaOcena)
            }))
        }
        else throw new BadRequestException("Molimo da popunite polje za pretragu!")
    }

    public async getProizvodByID(proizvodID: number) {
        if (await this.proizvodRepository.existsBy({ id: proizvodID }))
            return await this.proizvodRepository.findOne({
                where: { id: proizvodID },
                select: {
                    prodavnica: {
                        id: true,
                        naziv: true,
                        adresa: true
                    }
                },
                relations: ['prodavnica']
            })
        else throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
    }

    public async create(proizvodDto: ProizvodDto) {
        const proizvod = this.proizvodRepository.create(proizvodDto)
        return await this.proizvodRepository.save(proizvod)
    }

    public async update(proizvodID: number, proizvodDto: ProizvodDto) {
        if (await this.proizvodRepository.existsBy({ id: proizvodID })) {
            const proizvod = await this.proizvodRepository.findOneBy({ id: proizvodID })
            return await this.proizvodRepository.update(proizvodID, proizvodDto).then(res => {
                if (res.affected === 1) {
                    if (!proizvodDto.slika && proizvod.slika) {
                        const putanja = join(__dirname, '..', '..', '..', proizvod.slika)
                        if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                    }
                    return this.getProizvodByID(proizvodID)
                }
            })
        }
        else throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
    }

    public async updateRacunar(racunarID: number, racunarDto: RacunarDto) {
        const racunar = await this.getProizvodByID(racunarID) as Racunar
        if (racunar) {
            if (racunarDto.skladiste) {
                const skladiste = await this.skladisteRepository.findBy({ id: In(racunarDto.skladiste) })
                racunar.skladiste = skladiste
                return await this.racunarRepository.save(racunar)
            }
            else return await this.racunarRepository.update(racunarID, racunarDto).then(res => {
                if (res.affected === 1) {
                    return this.getProizvodByID(racunarID)
                }
            })
        }
        else throw new NotFoundException(`Racunar sa ID-jem ${racunarID} nije pronadjen!`)
    }

    public async delete(proizvodID: number) {
        const proizvod = await this.getProizvodByID(proizvodID)
        if (proizvod) {
            return await this.proizvodRepository.delete(proizvodID).then(res => {
                if (res.affected === 1) {
                    if (proizvod.slika) {
                        const putanja = join(__dirname, '..', '..', '..', proizvod.slika)
                        if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                    }
                    return { proizvodID: proizvodID, prodavnicaID: proizvod.prodavnica.id }
                }
            })
        }
        else throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
    }

    public async deleteAll(prodavnicaID: number) {
        const proizvodi = await this.proizvodRepository.findBy({ prodavnica: { id: prodavnicaID } })
        if (proizvodi.length > 0) {
            proizvodi.forEach(proizvod => {
                if (proizvod.slika) {
                    const putanja = join(__dirname, '..', '..', '..', proizvod.slika)
                    if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                }
            })
            return await this.proizvodRepository.remove(proizvodi)
        }
        //else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nema unete proizvode!`)
    }

    public async upload(proizvodID: number, file: Express.Multer.File) {
        if (await this.proizvodRepository.existsBy({ id: proizvodID }) && file) {
            return { proizvodID: proizvodID, path: `${file.destination}/${file.filename}` }
        }
        else throw new BadRequestException('Slika nije upload-ovana!')
    }    
}
