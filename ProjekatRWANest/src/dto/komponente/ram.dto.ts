import { RacunarskaKomponentaDto } from "../racunarska-komponenta.dto";

export class RAMDto extends RacunarskaKomponentaDto {
    tipMemorije: string
    brojRAMModula: number
    velicina: number
    frekvencija: number
}