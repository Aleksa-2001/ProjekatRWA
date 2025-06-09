import { RacunarskaKomponentaDto } from "../racunarska-komponenta.dto";

export class CPUDto extends RacunarskaKomponentaDto {
    socket: string
    frekvencija: number
    brojJezgara: number
    brojNiti: number
}