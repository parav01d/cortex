import express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import { PayloadAction } from '@reduxjs/toolkit'
import wildcard from "socketio-wildcard";
import { hostname } from "os";

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);
io.use(wildcard());

const houses = [...Array(1000).keys()].map((n) => ({
    id: `${n}`,
    name: `Bungalow ${n}`
}))

app.get('/', function (req, res) {
    console.log('HTTP/HTTPS WORKS');
    res.status(200).send({ success: true });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('*', console.log);
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