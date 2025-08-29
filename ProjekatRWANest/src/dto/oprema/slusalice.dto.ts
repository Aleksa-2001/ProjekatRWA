import { RacunarskaOpremaDto } from "../racunarska-oprema.dto";

export class SlusaliceDto extends RacunarskaOpremaDto {
    tipSlusalica: string
    povezivanje: string
    frekvencijaMin: number
    frekvencijaMax: number
    mikrofon: boolean
}