import { createAction, props } from "@ngrx/store";

export const showToast = createAction(
    "[Toast] Prikazi poruku",
    props<{
        poruka: string,
        tipPoruke: string | null
    }>()
)

export const hideToast = createAction(
    "[Toast] Sakrij poruku"
)
