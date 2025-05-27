import { Injectable, NotFoundException } from '@nestjs/common';
import { Proizvod } from './entities/proizvod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CPUDto } from './entities/komponente/cpu.dto';
import { CPU } from './entities/komponente/cpu.entity';
import { GPUDto } from './entities/komponente/gpu.dto';
import { GPU } from './entities/komponente/gpu.entity';
import { RAMDto } from './entities/komponente/ram.dto';
import { RAM } from './entities/komponente/ram.entity';

@Injectable()
export class ProizvodiService {

    constructor(
        @InjectRepository(Proizvod) private proizvodRepository: Repository<Proizvod>,
        @InjectRepository(CPU) private cpuRepository: Repository<CPU>,
        @InjectRepository(GPU) private gpuRepository: Repository<GPU>,
        @InjectRepository(RAM) private ramRepository: Repository<RAM>
    ) { }

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

    public async getProizvodByID(proizvodID: number) {
        //const proizvod = this.lista.find(proizvod => proizvod.id === proizvodID)
        return await this.proizvodRepository.findOne({
            where: { id: proizvodID },
            relations: ['prodavnica']
        })
        //if (proizvod) return proizvod
        //else throw new HttpException(`Proizvod sa ID-jem ${proizvodID} ne postoji!`, HttpStatus.NOT_FOUND) 
    }

    public async createCPU(dto: CPUDto) {
        const cpu = this.cpuRepository.create(dto)
        return await this.cpuRepository.save(cpu)
    }

    public async createGPU(dto: GPUDto) {
        const gpu = this.gpuRepository.create(dto)
        return await this.gpuRepository.save(gpu)
    }

    public async createRAM(dto: RAMDto) {
        const ram = this.ramRepository.create(dto)
        return await this.ramRepository.save(ram)
    }

    public async updateCPU(proizvodID: number, dto: CPUDto) {
        if (await this.cpuRepository.existsBy({ id: proizvodID })) {
            return await this.cpuRepository.update(proizvodID, dto).then(async res => {
                if (res.affected === 1) return await this.getProizvodByID(proizvodID)
            })
        }
        else {
            throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
        }
    }

    public async updateGPU(proizvodID: number, dto: GPUDto) {
        if (await this.gpuRepository.existsBy({ id: proizvodID })) {
            return await this.gpuRepository.update(proizvodID, dto).then(res => {
                if (res.affected === 1) return this.getProizvodByID(proizvodID)
            })
        }
        else {
            throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
        }
    }

    public async updateRAM(proizvodID: number, dto: RAMDto) {
        if (await this.ramRepository.existsBy({ id: proizvodID })) {
            return await this.ramRepository.update(proizvodID, dto).then(res => {
                if (res.affected === 1) return this.getProizvodByID(proizvodID)
            })
        }
        else {
            throw new NotFoundException(`Proizvod sa ID-jem ${proizvodID} nije pronadjen!`)
        }
    }

    public async delete(proizvodID: number) {
        return await this.proizvodRepository.delete(proizvodID)
    }
    
}
