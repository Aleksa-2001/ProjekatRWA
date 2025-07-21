import { CPU } from "src/models/komponente/cpu.entity"
import { GPU } from "src/models/komponente/gpu.entity"
import { Kuciste } from "src/models/komponente/kuciste.entity"
import { MaticnaPloca } from "src/models/komponente/maticna-ploca.entity"
import { Napajanje } from "src/models/komponente/napajanje.entity"
import { RAM } from "src/models/komponente/ram.entity"
import { Skladiste } from "src/models/komponente/skladiste.entity"
import { Proizvod } from "src/models/proizvod.entity"

export class RacunarDto extends Proizvod {
    maticnaPloca: MaticnaPloca
    cpu: CPU
    ram: RAM
    skladiste: Skladiste[]
    napajanje: Napajanje
    gpu: GPU
    kuciste: Kuciste
}