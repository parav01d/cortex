import { findHouseEpic } from "Flux/Epic/FindHouse/FindHouseEpic";
import { getHouseEpic } from "Flux/Epic/GetHouse/GetHouseEpic";

import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(findHouseEpic, getHouseEpic);

