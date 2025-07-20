import { DataSourceOptions } from "typeorm";
import { User } from "src/models/user.entity";
import { Prodavnica } from "src/models/prodavnica.entity";
import { Proizvod } from "src/models/proizvod.entity";
import { Racunar } from "src/models/racunar.entity";
import { RacunarskaKomponenta } from "src/models/racunarska-komponenta.entity";
import { CPU } from "src/models/komponente/cpu.entity";
import { GPU } from "src/models/komponente/gpu.entity";
import { RAM } from "src/models/komponente/ram.entity";
import { MaticnaPloca } from "src/models/komponente/maticna-ploca.entity";
import { Skladiste } from "src/models/komponente/skladiste.entity";
import { Napajanje } from "src/models/komponente/napajanje.entity";
import { Recenzija } from "src/models/recenzija.entity";
import { Kuciste } from "src/models/komponente/kuciste.entity";

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
        RAM, 
        MaticnaPloca, 
        Skladiste, 
        Napajanje,
        Kuciste,
        Recenzija
    ],
    synchronize: true
}