import { Action } from "@reduxjs/toolkit";
import { dispatch } from "Flux";
import { $backend } from "./Socket/Backend";

console.log("Init Backend Subscription");

$backend.subscribe({
    next: (action: Action) => {
        console.log("Dispatch old", action)
        dispatch(action)
    },
    error: console.log,
    complete: console.log
});
