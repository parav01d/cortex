import { filter, of, mergeMap } from "rxjs";
import { Epic } from "Flux";

export const failureEpic: Epic = (action$) =>
    action$.pipe(
        filter((action) => action.type.match("Failure")),
        mergeMap((action) => of(action))
    )
