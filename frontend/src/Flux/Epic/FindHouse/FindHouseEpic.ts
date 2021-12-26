import { filter, map, withLatestFrom } from "rxjs";
import { Epic } from "Flux";

export const findHouseEpic: Epic = (action$, state$, {
  PerformanceService,
  findHouseRequest,
  findHouseSuccess,
  findHouseFailure
}) =>
  action$.pipe(
    filter(findHouseRequest.match),
    withLatestFrom(state$),
    map(([action, state]) => {
      const id = action.payload.id;
      const house = state.house.detail;
      return findHouseFailure({ error: new Error() });
    })
  )
