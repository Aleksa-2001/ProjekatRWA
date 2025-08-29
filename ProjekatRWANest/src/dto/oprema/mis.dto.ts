import { RacunarskaOpremaDto } from "../racunarska-oprema.dto";

export class MisDto extends RacunarskaOpremaDto {
    tipMisa: string
    senzor: string
    DPI: number
    promenljivDPI: boolean
    pozadinskoOsvetljenje: boolean
}