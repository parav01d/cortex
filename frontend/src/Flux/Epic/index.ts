import { successEpic } from "Flux/Epic/SocketResponse/SuccessEpic";
import { failureEpic } from "Flux/Epic/SocketResponse/FailureEpic";

import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(failureEpic, successEpic);

