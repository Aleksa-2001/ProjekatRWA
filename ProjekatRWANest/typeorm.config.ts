import { Prodavnica } from "src/prodavnice/entities/prodavnica.entity";
import { Proizvod } from "src/proizvodi/entities/proizvod.entity";
import { User } from "src/users/entities/user.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    entities: [User, Prodavnica, Proizvod],
    synchronize: true
}