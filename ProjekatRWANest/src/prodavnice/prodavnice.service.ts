import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodavnica } from './entities/prodavnica.entity';
import { Repository } from 'typeorm';
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

    public getProdavnice() {
        //return this.lista
        return this.prodavnicaRepository.find()
    }

    public getProdavnicaByID(prodavnicaID: number) {
        //const prodavnica = this.lista.find(prodavnica => prodavnica.id === prodavnicaID)
        return this.prodavnicaRepository.findOneBy({ id: prodavnicaID })/*.then(prodavnica => {
            console.log(prodavnica)
            if (prodavnica) return prodavnica
            else throw new HttpException(`Prodavnica sa ID-jem ${prodavnicaID} ne postoji!`, HttpStatus.NOT_FOUND)
        }).catch(error => error.status).finally(() => console.log(prodavnica))*/
        //if (prodavnica) return prodavnica
        //else throw new HttpException(`Prodavnica sa ID-jem ${prodavnicaID} ne postoji!`, HttpStatus.NOT_FOUND)
    }

    public async create(prodavnicaDto: ProdavnicaDto) {
        const prodavnica = this.prodavnicaRepository.create(prodavnicaDto)
        return await this.prodavnicaRepository.save(prodavnica)
    }

    public async update(prodavnicaID: number, prodavnicaDto: ProdavnicaDto) {
        //return await this.prodavnicaRepository.save({ 
        //    id: prodavnicaID,
        //    prodavnicaDto
        //})
        return await this.prodavnicaRepository.update(prodavnicaID, prodavnicaDto)
            .then(res => {
                if (res.affected === 1)
                    return this.getProdavnicaByID(prodavnicaID)
            })
    }

    public async delete(prodavnicaID: number) {
        return await this.prodavnicaRepository.delete(prodavnicaID)
    }
}
