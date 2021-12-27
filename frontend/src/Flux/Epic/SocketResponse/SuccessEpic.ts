import { filter, of, mergeMap } from "rxjs";
import { Epic } from "Flux";

export const successEpic: Epic = (action$) =>
  action$.pipe(
    filter((action) => action.type.match("Success")),
    mergeMap((action) => of(action))
  )
