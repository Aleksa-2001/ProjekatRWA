import { RacunarskaKomponentaDto } from "../racunarska-komponenta.dto";

export class MaticnaPlocaDto extends RacunarskaKomponentaDto {
    tipMaticnePloce: string
    socket: string
    brojRAMSlotova: number
    brojUSB20Portova: number
    brojUSB30Portova: number
    brojUSB31Portova: number
}