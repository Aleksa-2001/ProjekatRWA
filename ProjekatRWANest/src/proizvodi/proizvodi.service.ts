import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { ProizvodDto } from '../dto/proizvod.dto';
import { Proizvod } from '../models/proizvod.entity';
import { CPU } from '../models/komponente/cpu.entity';
import { GPU } from '../models/komponente/gpu.entity';
import { RAM } from '../models/komponente/ram.entity';
import { MaticnaPloca } from 'src/models/komponente/maticna-ploca.entity';
import { Skladiste } from 'src/models/komponente/skladiste.entity';
import { Napajanje } from 'src/models/komponente/napajanje.entity';

@Injectable()
export class ProizvodiService {

    constructor(
        @InjectRepository(Proizvod) private proizvodRepository: Repository<Proizvod>,
        @InjectRepository(CPU) private cpuRepository: Repository<CPU>,
        @InjectRepository(GPU) private gpuRepository: Repository<GPU>,
        @InjectRepository(RAM) private ramRepository: Repository<RAM>,
        @InjectRepository(CPU) private maticnaPlocaRepository: Repository<MaticnaPloca>,
        @InjectRepository(GPU) private skladisteRepository: Repository<Skladiste>,
        @InjectRepository(RAM) private napajanjeRepository: Repository<Napajanje>,
    ) { }

    //public async getAll() {
    //    //return this.lista
    //    return this.proizvodRepository.find()
    //}

    public async getProizvodi(prodavnicaID: number) {
        return this.proizvodRepository.find({ 
            where: { prodavnica: { id: prodavnicaID } }
        })
    }

    public async getProizvodiBySearch(search: string) {
        return await this.proizvodRepository.findBy(
            [
                { proizvodjac: ILike(`%${search.toLowerCase()}%`) }, 
                { naziv: ILike(`%${search.toLowerCase()}%`) }, 
                { type: ILike(`%${search.toLowerCase()}%`) }
            ]
        )
    }

    public async getProizvodByID(proizvodID: number) {
        if (await this.proizvodRepository.existsBy({ id: proizvodID }))
            return await this.proizvodRepository.findOne({
                where: { id: proizvodID },
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

    public async delete(proizvodID: number) {
        if (await this.proizvodRepository.existsBy({ id: proizvodID })) {
            const proizvod = await this.proizvodRepository.findOneBy({ id: proizvodID })
            return await this.proizvodRepository.delete(proizvodID).then(res => {
                if (res.affected === 1) {
                    if (proizvod.slika) {
                        const putanja = join(__dirname, '..', '..', '..', proizvod.slika)
                        if (fs.existsSync(putanja)) fs.unlinkSync(putanja)
                    }
                    return proizvodID
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
