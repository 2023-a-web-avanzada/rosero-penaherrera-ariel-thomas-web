"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let usuario = "";
let EventosGateway = exports.EventosGateway = class EventosGateway {
    constructor() {
        this.MAX_USERS_PER_ROOM = 2;
        this.rooms = {};
    }
    unirseSala(message, socket) {
        if (!this.rooms[message.salaId]) {
            this.rooms[message.salaId] = { users: [] };
        }
        if (this.rooms[message.salaId].users.length < this.MAX_USERS_PER_ROOM) {
            socket.join(message.salaId);
            if (!this.rooms[message.salaId].users.includes(socket)) {
                this.rooms[message.salaId].users.push(socket);
                const mensajeDeBienvenidaSala = {
                    mensaje: `Bienvenido ${message.nombre} a la sala  ${message.salaId}`,
                    error: false
                };
                console.log("Se mando");
                socket.broadcast
                    .to(message.salaId)
                    .emit('escucharEventoUnirseSala', mensajeDeBienvenidaSala);
                usuario = message.nombre;
                return { error: false };
            }
        }
        else {
            const mensajeError = {
                mensaje: `La sala ${message.salaId} ya está llena`,
                error: true
            };
            return { error: mensajeError.error };
        }
    }
    enviarMensaje(message, socket) {
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId,
            board: message.board,
            posicion: message.posicion,
            ganador: message.ganador
        };
        if (usuario === message.nombre) {
        }
        else {
            socket.broadcast
                .to(message.salaId)
                .emit('escucharEventoMensajeSala', mensajeSala);
            usuario = message.nombre;
            return { mensaje: 'ok' };
        }
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('unirseSala'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "unirseSala", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('enviarMensaje'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "enviarMensaje", null);
exports.EventosGateway = EventosGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(11202, {
        cors: {
            origin: '*',
        }
    })
], EventosGateway);
//# sourceMappingURL=eventos.gateway.js.map