import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecenzijaDto } from 'src/dto/recenzija.dto';
import { Recenzija } from 'src/models/recenzija.entity';
import { User } from 'src/models/user.entity';
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
            relations: ['user', 'prodavnica', 'proizvod']
        })
    }

    public async getRecenzijeByUserID(userID: number) {
        return await this.recenzijaRepository.find({
            where: { user: { userID: userID } },
            select: {
                user: {
                    userID: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            relations: ['user', 'prodavnica', 'proizvod']
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
            relations: ['user', 'prodavnica']
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
            relations: ['user', 'proizvod']
        })
    }

    public async getRecenzijaByID(recenzijaID: number) {
        if (await this.recenzijaRepository.existsBy({ id: recenzijaID })) {
            return await this.recenzijaRepository.findOne({
                where: { id: recenzijaID },
                select: {
                    user: {
                        userID: true,
                        firstName: true,
                        lastName: true,
                        username: true
                    },
                    prodavnica: true,
                    proizvod: true
                },
                relations: ['user', 'prodavnica', 'proizvod']
            })
        }
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }

    public async create(recenzijaDto: RecenzijaDto) {
        if (!((recenzijaDto.prodavnica && recenzijaDto.proizvod) || (!recenzijaDto.prodavnica && !recenzijaDto.proizvod))) {
            if (!(await this.recenzijaRepository.findOneBy({ 
                user: { userID: recenzijaDto.user.userID }, 
                prodavnica: recenzijaDto.prodavnica, 
                proizvod: recenzijaDto.proizvod }
            ))) {
                const recenzija = this.recenzijaRepository.create(recenzijaDto)
                return await this.recenzijaRepository.save(recenzija)
            }
            else throw new ForbiddenException(`Vec ste uneli recenziju za ${recenzijaDto.prodavnica ? 'ovu prodavnicu' : 'ovaj proizvod'}!`)
        }
        else throw new BadRequestException("Unos nije ispravan!")
    }

    public async update(recenzijaID: number, recenzijaDto: RecenzijaDto, user: User) {
        const recenzija = await this.getRecenzijaByID(recenzijaID)
        if (recenzija) {
            if (!((recenzijaDto.prodavnica && recenzijaDto.proizvod) || (!recenzijaDto.prodavnica && !recenzijaDto.proizvod)))
                if (recenzija.user.userID === user.userID || (recenzija.user.userID !== user.userID && user.admin))
                    return await this.recenzijaRepository.update(recenzijaID, recenzijaDto).then(res => {
                        if (res.affected === 1) return this.getRecenzijaByID(recenzijaID)
                    })
                else throw new ForbiddenException("Ne mozete promeniti tudju recenziju!")
            else throw new BadRequestException("Unos nije ispravan!")
        }
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }

    public async delete(recenzijaID: number, user: User) {
        const recenzija = await this.getRecenzijaByID(recenzijaID)
        if (recenzija) {
            if (recenzija.user.userID === user.userID || (recenzija.user.userID !== user.userID && user.admin))
                return await this.recenzijaRepository.delete(recenzijaID).then(res => {
                    if (res.affected === 1) return recenzijaID
                })
            else throw new ForbiddenException("Ne mozete obrisati tudju recenziju!")
        }
        else throw new NotFoundException(`Recenzija sa ID-jem ${recenzijaID} nije pronadjena!`)
    }
}
