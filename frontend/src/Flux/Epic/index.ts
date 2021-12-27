import { findHouseEpic } from "Flux/Epic/FindHouse/FindHouseEpic";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(findHouseEpic);

