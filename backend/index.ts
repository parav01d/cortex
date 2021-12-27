import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4004 });

const houses = [...Array(1000).keys()].map((n) => ({
    id: `${n}`,
    name: `Bungalow ${n}`
}));

wss.on('connection', (ws: any, req: any, client: any) => {
    console.log("Connection Established: " + req.socket.remoteAddress);
    ws.on('message', function message(buffer: any) {
        const action = JSON.parse(buffer.toString());
        console.log(action);
        switch (action.type) {
            case "house/findHouseRequest":
                console.log(`Received message ${action} from user ${client}`);
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
                console.log(`Received message ${action} from user ${client}`);
                const { take, page } = action.payload;
                const first = take * (page - 1);
                const last = first + take;
                setTimeout(() => {
                    if (Math.random() < 0.8) {
                        ws.send(JSON.stringify({
                            payload: { houses: houses.filter((h, i) => i > first && i < last), total: 1000 },
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



/**

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('GetHouseRequest', (action: PayloadAction<{ take: number, page: number }>) => {
        const { take, page } = action.payload;
        const first = take * (page - 1);
        const last = first + take;
        setTimeout(() => {
            if (Math.random() < 0.8) {
                socket.emit('GetHouseSuccess', {
                    payload: { houses: houses.filter((h, i) => i > first && i < last), total: 1000 },
                    type: "FindHouseSuccess"
                })
            } else {
                socket.emit('GetHouseFailure', {
                    payload: { code: 500, message: "SERVER ERROR" },
                    type: "GetHouseFailure"
                })
            }
        }, 1000)
    });

    socket.on('FindHouseRequest', (action: PayloadAction<{ id: string }>) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                socket.emit('FindHouseSuccess', {
                    payload: { house: houses.find((h) => h.id === action.payload.id) },
                    type: "FindHouseSuccess"
                })
            } else {
                socket.emit('FindHouseFailure', {
                    payload: { code: 500, message: "SERVER ERROR" },
                    type: "FindHouseFailure"
                })
            }
        }, 1000)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(4004, () => {
    console.log("Running at localhost:4004");
});

console.log(hostname());

 */