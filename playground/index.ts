/**
 * Monkey Patching Redux Dispatch
 */

import { Subject } from "rxjs";

const action$ = new Subject();
const backend$ = new Subject();

backend$.subscribe((a) => {
    action$.next(a); // Old Dispatch
})

const dispatch = (action: any) => {
    backend$.next(action); // New Dispatch
}

action$.subscribe((a: any) => {
    console.log(a.type);
})

dispatch({ type: "testBootstrapped", payload: {} });
dispatch({ type: "testRequest", payload: {} });
backend$.next({ type: "testSuccess", payload: {} });


