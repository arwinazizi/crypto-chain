import { WebSocketServer } from 'ws';
import pkg from 'ws';
const WebSocket = pkg; // klientkonstruktor

const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
};

export default class Network {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
    this.port = process.env.P2P_PORT || 6000;
    this.peers = process.env.PEERS?.split(',') || [];
  }

  listen() {
    const server = new WebSocketServer({ port: this.port });

    server.on('connection', (socket) => this.connectSocket(socket));

    this.peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });

    console.log(`P2P WebSocket server listening on port ${this.port}`);
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('🔌 Connected to peer');
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
    console.log('📩 Received message:', message);
      const data = JSON.parse(message);

      switch (data.type) {
        case MESSAGE_TYPES.chain:
          console.log('🔄 Replacing chain');
          this.blockchain.replaceChain(data.chain);
          break;
        case MESSAGE_TYPES.transaction:
          console.log('➕ Received transaction');
          this.transactionPool.addTransaction(data.transaction);
          break;

        default:
          console.log('⚠️ Unknown message type:', data.type);
      }
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain,
      })
    );
  }

  broadcastTransaction(transaction) {
    console.log('📡 Broadcasting chain to', this.sockets.length, 'peers');
    this.sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: MESSAGE_TYPES.transaction,
          transaction,
        })
      );
    });
  }

  broadcastChain() {
    this.sockets.forEach((socket) => this.sendChain(socket));
  }
}
