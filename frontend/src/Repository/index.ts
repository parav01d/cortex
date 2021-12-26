import { webSocket } from "rxjs/webSocket";

export const $backend = webSocket({
    protocol: 'v1',
    url: "ws://d3ff-2a02-810a-8c0-3972-b866-e309-a0ba-8b3.ngrok.io:4004"
});

$backend.subscribe(console.log);