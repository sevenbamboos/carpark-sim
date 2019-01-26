'use strict';
const EventEmitter = require('events').EventEmitter;

// split socket data based on line separator
class SocketLineParser extends EventEmitter {
  constructor(socket) {
    super();

    let buffer;
    socket.on('data', data => {
      buffer = data.toString();
      let lineEnd = buffer.indexOf('\n');
      while (lineEnd !== -1) {
        this.emit('line', buffer.substring(0, lineEnd));
        buffer = buffer.substring(lineEnd + 1);
        lineEnd = buffer.indexOf('\n');
      }
    });    
  }
}

module.exports = {
  SocketLineParser,
};