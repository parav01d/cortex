import { webSocket } from "rxjs/webSocket";

export const backend$ = webSocket({
    url: "ws://localhost:4004",
    deserializer: (e: MessageEvent) => JSON.parse(e.data),
    serializer: (value: any) => JSON.stringify(value)
});