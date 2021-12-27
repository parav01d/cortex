import { filter, of, mergeMap, withLatestFrom } from "rxjs";
import { Epic } from "Flux";

export const findHouseEpic: Epic = (action$, state$, {
  findHouseRequest,
  findHouseFailure
}) =>
  action$.pipe(
    filter(findHouseRequest.match),
    withLatestFrom(state$),
    mergeMap(() => {
      return of(findHouseFailure({ error: new Error() }));
    })
  )
