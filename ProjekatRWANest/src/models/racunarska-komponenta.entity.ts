import { Proizvod } from "./proizvod.entity"
import { ChildEntity } from "typeorm"

@ChildEntity()
export abstract class RacunarskaKomponenta extends Proizvod { }