import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4004 });

const houses = [...Array(100).keys()].map((n) => ({
    id: `${n}`,
    name: `Bungalow ${n}`
}));

wss.on('connection', (ws: any, req: any, client: any) => {
    console.log("Connection Established: " + req.socket.remoteAddress);
    ws.on('message', function message(buffer: any) {
        const action = JSON.parse(buffer.toString());
        console.log(action.type);
        switch (action.type) {
            case "house/findHouseRequest":
                setTimeout(() => {
                    if (Math.random() < 0.8) {
                        ws.send(JSON.stringify({
                            payload: { house: houses.find((h) => h.id === action.payload.id) },
                            type: "house/findHouseSuccess"
                        }))
                    } else {
                        ws.send(JSON.stringify({
                            payload: { code: 500, message: "SERVER ERROR" },
                            type: "house/findHouseFailure"
                        }))
                    }
                }, 1000)
                break;
            case "house/getHouseRequest":
                const { take, page } = action.payload;
                const first = take * (page - 1);
                const last = first + take;
                setTimeout(() => {
                    if (Math.random() < 0.8) {
                        ws.send(JSON.stringify({
                            payload: { houses: houses.filter((h, i) => i > first && i < last), total: houses.length },
                            type: "house/getHouseSuccess"
                        }))
                    } else {
                        ws.send(JSON.stringify({
                            payload: { code: 500, message: "SERVER ERROR" },
                            type: "house/getHouseFailure"
                        }))
                    }
                }, 1000)
                break;
            default:
                break;
        }
    });
});
