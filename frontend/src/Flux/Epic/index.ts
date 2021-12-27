import { combineEpics } from "redux-observable";
import { successEpic } from "Flux/Epic/SocketResponse/SuccessEpic";
import { failureEpic } from "Flux/Epic/SocketResponse/FailureEpic";

export const rootEpic = combineEpics(
    failureEpic,
    successEpic
);
