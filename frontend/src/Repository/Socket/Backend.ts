import { Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { Action } from "@reduxjs/toolkit";

export const $backend1 = webSocket({
    url: "ws://d3ff-2a02-810a-8c0-3972-b866-e309-a0ba-8b3.ngrok.io",
    deserializer: (e: MessageEvent) => JSON.parse(e.data),
    serializer: (value: any) => JSON.stringify(value)
});

export const $backend = new Subject<Action>();