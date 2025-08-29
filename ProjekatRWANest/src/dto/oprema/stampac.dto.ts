import { RacunarskaOpremaDto } from "../racunarska-oprema.dto";

export class StampacDto extends RacunarskaOpremaDto {
    tipStampaca: string
    bojaStampe: string
    format: string
    rezolucija: number
    obostranoStampanje: boolean
}