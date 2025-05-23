import { Prodavnica } from "src/prodavnice/entities/prodavnica.entity";
import { CPU } from "src/proizvodi/entities/komponente/cpu.entity";
import { GPU } from "src/proizvodi/entities/komponente/gpu.entity";
import { RAM } from "src/proizvodi/entities/komponente/ram.entity";
import { Proizvod } from "src/proizvodi/entities/proizvod.entity";
import { Racunar } from "src/proizvodi/entities/racunar.entity";
import { RacunarskaKomponenta } from "src/proizvodi/entities/racunarska-komponenta.entity";
import { User } from "src/users/entities/user.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [
        User, 
        Prodavnica, 
        Proizvod, 
        Racunar, 
        RacunarskaKomponenta, 
        CPU, 
        GPU, 
        RAM
    ],
    synchronize: true
}