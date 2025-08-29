import { Validators } from "@angular/forms";

export const opremaFormMetadata: Record<string, () => { [key: string]: any }> = {
  Monitor: () => ({
    tipPanela: ['', Validators.required],
    rezolucijaSirina: ['', Validators.required],
    rezolucijaVisina: ['', Validators.required],
    refreshRate: ['', Validators.required],
    dijagonala: ['', Validators.required],
    brojHDMIKonektora: [],
    brojDisplayPortKonektora: []
  }),
  Tastatura: () => ({
    tipTastature: ['', Validators.required],
    tipTastera: ['', Validators.required],
    pozadinskoOsvetljenje: [false]
  }),
  Mis: () => ({
    tipMisa: ['', Validators.required],
    senzor: ['', Validators.required],
    DPI: ['', Validators.required],
    promenljivDPI: [false],
    pozadinskoOsvetljenje: [false]
  }),
  Slusalice: () => ({
    tipSlusalica: ['', Validators.required],
    povezivanje: ['', Validators.required],
    frekvencijaMin: ['', Validators.required],
    frekvencijaMax: ['', Validators.required],
    mikrofon: [false]
  }),
  Zvucnik: () => ({
    tipZvucnika: ['', Validators.required],
    frekvencijaMin: ['', Validators.required],
    frekvencijaMax: ['', Validators.required]
  }),
  Stampac: () => ({
    tipStampaca: ['', Validators.required],
    bojaStampe: ['', Validators.required],
    format: ['', Validators.required],
    rezolucija: ['', Validators.required],
    obostranoStampanje: [false]
  })
}