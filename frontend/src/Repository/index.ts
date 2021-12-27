import { Action } from "@reduxjs/toolkit";
import { backend$ } from "./Socket/Backend";

console.log("Init Backend Subscription");

backend$.subscribe({
    next: (action: Action) => {
        console.log("$backend meldet: ", action)
    },
    error: console.log,
    complete: console.log
});
