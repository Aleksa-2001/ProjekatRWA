import { createAction, props } from "@ngrx/store";

//Test
export const setItem = createAction(
    "Set Item",
    props<{
        item: string
    }>()
)