import { Epic } from "Flux";
import { $backend } from "Repository";
import { EMPTY, mergeMap } from "rxjs";
import { findHouseEpic } from "Flux/Epic/FindHouse/FindHouseEpic";
import { combineEpics } from "redux-observable";

const backendEpic: Epic = (action$) =>
    action$.pipe(
        mergeMap((action) => {
            console.log(action);
            $backend.next(action);
            return EMPTY;
        })
    )

export const rootEpic = combineEpics(findHouseEpic, backendEpic);