import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodavnica } from './entities/prodavnica.entity';
import { ILike, Like, Repository } from 'typeorm';
import { ProdavnicaDto } from './entities/prodavnica.dto';

@Injectable()
export class ProdavniceService {
    
    constructor(@InjectRepository(Prodavnica) private prodavnicaRepository: Repository<Prodavnica>) { }

    //lista = [
    //    {
    //        'id': 1,
    //        'naziv': 'GIGATRON',
    //        'adresa': 'Delta Planet Niš',
    //        'opis': 'GIGATRON prodavnica na prvom spratu tržnog centra Delta Planet u Nišu',
    //        'slika': 'images/ng/prodavnice/gigatron-delta-nis.jpg',
    //    },
    //    {
    //        'id': 2,
    //        'naziv': 'Tehnomanija',
    //        'adresa': 'Nikole Pašića 28a Niš',
    //        'opis': '',
    //        'slika': 'images/ng/prodavnice/tehnomanija-nikole-pasica-nis.jpg',
    //    }
    //]

    public async getProdavnice() {
        //return this.lista
        return await this.prodavnicaRepository.find()
    }

    public async getProdavniceBySearch(search: string) {
        return await this.prodavnicaRepository.findBy({
            naziv: ILike(`%${search.toLowerCase()}%`)
        })
    }

    public async getProdavnicaByID(prodavnicaID: number) {
        //const prodavnica = this.lista.find(prodavnica => prodavnica.id === prodavnicaID)
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
            return await this.prodavnicaRepository.update(prodavnicaID, prodavnicaDto).then(res => {
                if (res.affected === 1) return this.getProdavnicaByID(prodavnicaID)
            })
        }
        else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nije pronadjena!`)
    }

    public async delete(prodavnicaID: number) {
        if (await this.prodavnicaRepository.existsBy({ id: prodavnicaID })) {
            return await this.prodavnicaRepository.delete(prodavnicaID).then(res => {
                if (res.affected === 1) return prodavnicaID
            })
        }
        else throw new NotFoundException(`Prodavnica sa ID-jem ${prodavnicaID} nije pronadjena!`)
        
    }
}
