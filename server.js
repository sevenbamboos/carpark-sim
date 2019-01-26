'use strict';
const { around } = require('./lib/common');
const { CarPark, Bus } = require('./lib/core');
const { parseAndExecute } = require('./lib/command');
const { SocketLineParser } = require('./lib/socket');
const net = require('net');
const port = 9999;
const carPark = new CarPark(5, 5);
const verbose = true;

const execCmdOrIgnore = (exec, command, socket) => {
  console.log('cmd:', command);
  try {
    const result = exec(command);
    if (result) socket.write(result.toString() + '\n');
  } catch (e) {
    console.warn(e);
  }
};

const server = net.createServer(socket => {
    console.log('client connected ', socket.address());

    // always reset carpark when the client starts
    carPark.reset();

    // always create a new bus for each client
    // TODO assign a global ID
    const bus = new Bus(1);
    const exec = around(
      null, 
      parseAndExecute(carPark, bus), 
      () => { if (verbose) console.log(carPark.toStr()); } // print out carPark after each command
    );

    new SocketLineParser(socket).on('line', cmd => execCmdOrIgnore(exec, cmd, socket));

    socket.on('close', () => {
      console.log('client closed');
    });
  }  
);

server.listen(port, () => console.log(`Listening on ${port}`));