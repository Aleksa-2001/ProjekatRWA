import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecenzijaDto } from 'src/dto/recenzija.dto';
import { Recenzija } from 'src/models/recenzija.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecenzijeService {

    constructor(
        @InjectRepository(Recenzija) private recenzijaRepository: Repository<Recenzija>
    ) { }

    public async getAll() {
        return await this.recenzijaRepository.find({
            select: {
                user: {
                    userID: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            relations: ['user']
        })
    }

    public async getRecenzijeByProdavnicaID(prodavnicaID: number) {
        return await this.recenzijaRepository.find({
            where: { prodavnica: { id: prodavnicaID } },
            select: {
                user: {
                    userID: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            relations: ['user']
        })
    }

    public async getRecenzijeByProizvodID(proizvodID: number) {
        return await this.recenzijaRepository.find({
            where: { proizvod: { id: proizvodID } },
            select: {
                user: {
                    userID: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            relations: ['user']
        })
    }

    public async getRecenzijaByID(recenzijaID: number) {
        if (await this.recenzijaRepository.existsBy({ id: recenzijaID }))
            return await this.recenzijaRepository.findOne({
                where: { id: recenzijaID },
                select: {
                    user: {
                        userID: true,
                        firstName: true,
                        lastName: true,
                        username: true
                    }
                },
                relations: ['user']
            })
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }

    public async create(recenzijaDto: RecenzijaDto) {
        if (!((recenzijaDto.prodavnica && recenzijaDto.proizvod) || (!recenzijaDto.prodavnica && !recenzijaDto.proizvod))) {
            const recenzija = this.recenzijaRepository.create(recenzijaDto)
            return await this.recenzijaRepository.save(recenzija)
        }
        else throw new BadRequestException("Unos nije ispravan!")
    }

    public async update(recenzijaID: number, recenzijaDto: RecenzijaDto) {
        if (await this.recenzijaRepository.existsBy({ id: recenzijaID })) {
            if (!((recenzijaDto.prodavnica && recenzijaDto.proizvod) || (!recenzijaDto.prodavnica && !recenzijaDto.proizvod)))
                return await this.recenzijaRepository.update(recenzijaID, recenzijaDto).then(res => {
                    if (res.affected === 1) return this.getRecenzijaByID(recenzijaID)
                })
            else throw new BadRequestException("Unos nije ispravan!")
        }
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }

    public async delete(recenzijaID: number) {
        if (await this.recenzijaRepository.existsBy({ id: recenzijaID })) {
            return await this.recenzijaRepository.delete(recenzijaID).then(res => {
                if (res.affected === 1) return recenzijaID
            })
        }
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }
}
