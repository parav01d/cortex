import { filter, of, mergeMap, withLatestFrom, EMPTY } from "rxjs";
import { Epic } from "Flux";

export const findHouseEpic: Epic = (action$, state$, {
  findHouseSuccess
}) =>
  action$.pipe(
    filter(findHouseSuccess.match),
    withLatestFrom(state$),
    mergeMap(([action]) => {
      console.log("EPIC ON: " + action.type)
      return of(action);
    })
  )
