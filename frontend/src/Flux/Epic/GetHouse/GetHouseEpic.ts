import { filter, of, mergeMap, withLatestFrom, EMPTY } from "rxjs";
import { Epic } from "Flux";

export const getHouseEpic: Epic = (action$, state$, {
  getHouseSuccess
}) =>
  action$.pipe(
    filter(getHouseSuccess.match),
    withLatestFrom(state$),
    mergeMap(([action]) => {
      console.log("EPIC ON: " + action.type)
      return of(action);
    })
  )
