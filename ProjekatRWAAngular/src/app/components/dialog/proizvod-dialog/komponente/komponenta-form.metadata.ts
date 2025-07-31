import { Validators } from "@angular/forms";

export const komponentaFormMetadata: Record<string, () => { [key: string]: any }> = {
  CPU: () => ({
    socket: ['', Validators.required],
    frekvencija: ['', Validators.required],
    brojJezgara: ['', Validators.required],
    brojNiti: ['', Validators.required]
  }),
  GPU: () => ({
    frekvencija: ['', Validators.required],
    VRAM: ['', Validators.required]
  }),
  RAM: () => ({
    tipMemorije: ['', Validators.required],
    brojRAMModula: ['', Validators.required],
    velicina: ['', Validators.required],
    frekvencija: ['', Validators.required]
  }),
  MaticnaPloca: () => ({
    tipMaticnePloce: ['', Validators.required],
    socket: ['', Validators.required], 
    brojRAMSlotova: ['', Validators.required], 
    brojUSB20Portova: [],
    brojUSB30Portova: [],
    brojUSB31Portova: []
  }),
  Skladiste: () => ({
    tipMemorije: ['', Validators.required], 
    velicina: ['', Validators.required]
  }),
  Napajanje: () => ({
    snaga: ['', Validators.required],
    modularno: [false]
  }),
  Kuciste: () => ({
    tipKucista: ['', Validators.required],
    duzina: ['', Validators.required],
    sirina: ['', Validators.required],
    visina: ['', Validators.required]
  })
}