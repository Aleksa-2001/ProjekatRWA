import { RacunarskaOpremaDto } from "../racunarska-oprema.dto";

export class MonitorDto extends RacunarskaOpremaDto {
    tipPanela: string
    rezolucijaSirina: number
    rezolucijaVisina: number
    refreshRate: number
    dijagonala: number
    brojHDMIKonektora?: number
    brojDisplayPortKonektora?: number
}