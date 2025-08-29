import { RacunarskaOpremaDto } from "../racunarska-oprema.dto";

export class ZvucnikDto extends RacunarskaOpremaDto {
    tipZvucnika: string
    frekvencijaMin: number
    frekvencijaMax: number
}