import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Proizvod } from './entities/proizvod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prodavnica } from 'src/prodavnice/entities/prodavnica.entity';

@Injectable()
export class ProizvodiService {

    constructor(@InjectRepository(Proizvod) private proizvodRepository: Repository<Proizvod>) { }

    //lista = [
    //    {
    //        "id": 1,
    //        "tip": 2,
    //        "proizvodjac": "AMD",
    //        "naziv": "Ryzen 3 3200G",
    //        "cena": 21000,
    //        "opis": "AMD Procesor sa integrisanom grafičkom karticom", 
    //        "slika": "images/ng/proizvodi/komponente/3200g.jpg",
    //        "prodavnica": {
    //            'id': 1,
    //            'naziv': 'GIGATRON',
    //            'adresa': 'Delta Planet Niš',
    //            'opis': '',
    //            'slika': 'images/ng/prodavnice/gigatron-delta-nis.jpg',
    //        },
    //        "tipKomponente": {
    //            "id": 1,
    //            "naziv": "Procesor"
    //        },
    //        "socket": "AM4",
    //        "frekvencija": 3.6,
    //        "brojJezgara": 4,
    //        "brojNiti": 4
    //    },
    //    {
    //        "id": 2,
    //        "tip": 2,
    //        "proizvodjac": "NVIDIA",
    //        "naziv": "GeForce RTX 4090",
    //        "cena": 99999,
    //        "opis": "NVIDIA grafička kartica", 
    //        "slika": "images/ng/proizvodi/komponente/geforce-rtx-4090.jpg",
    //        "prodavnica": {
    //            'id': 1,
    //            'naziv': 'GIGATRON',
    //            'adresa': 'Delta Planet Niš',
    //            'opis': '',
    //            'slika': 'images/ng/prodavnice/gigatron-delta-nis.jpg',
    //        },
    //        "tipKomponente": {
    //            "id": 2,
    //            "naziv": "Grafička karta"
    //        },
    //        "frekvencija": 2.8,
    //        "VRAM": 16
    //    },
    //    {
    //        "id": 3,
    //        "tip": 2,
    //        "proizvodjac": "Corasir",
    //        "naziv": "Vengeance LPX 16GB (2 x 8GB)",
    //        "cena": 9999,
    //        "opis": "RAM memorija DDR4 3600MHz CL18", 
    //        "slika": "images/ng/proizvodi/komponente/corsair-ram-16gb.png",
    //        "prodavnica": {
    //            'id': 2,
    //            'naziv': 'Tehnomanija',
    //            'adresa': 'Nikole Pašića 28a Niš',
    //            'opis': '',
    //            'slika': 'images/ng/prodavnice/tehnomanija-nikole-pasica-nis.jpg',
    //        },
    //        "tipKomponente": {
    //            "id": 3,
    //            "naziv": "RAM"
    //        },
    //        "tipMemorije": "DDR4", 
    //        "brojRAMModula": 2, 
    //        "velicina": 16,
    //        "frekvencija": 3600
    //    }
    //]

    public getAll() {
        //return this.lista
        return this.proizvodRepository.find()
    }

    public getProizvodi(prodavnicaID: number) {
        //return this.lista.filter(proizvod => proizvod.prodavnica.id == prodavnicaID)
        //return this.proizvodRepository.findBy({ prodavnica: prodavnica })
        return this.proizvodRepository.find({ 
            where: { prodavnica: { id: prodavnicaID } } 
        })
    }

    public getProizvodByID(proizvodID: number) {
        //const proizvod = this.lista.find(proizvod => proizvod.id === proizvodID)
        return this.proizvodRepository.findOneBy({ id: proizvodID })
        //if (proizvod) return proizvod
        //else throw new HttpException(`Proizvod sa ID-jem ${proizvodID} ne postoji!`, HttpStatus.NOT_FOUND) 
    }
    
}
