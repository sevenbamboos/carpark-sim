'use strict';
const { CarPark, Bus } = require('./lib/core');
const { executeCommand } = require('./lib/command');
const net = require('net');
const port = 9999;
const carPark = new CarPark(5, 5);

const execOneCmd = (exec, command) => {
  console.log('cmd:', command);
  try {
    return exec(command);
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
    const exec = executeCommand(carPark, bus);

    socket.on('data', data => {
      data.toString().split('\n').forEach(
        command => {
          const result = execOneCmd(exec, command);
          if (result) socket.write(result.toString() + '\n');
        }
      );
    });

    socket.on('close', () => {
      console.log('client closed');
    });
  }  
);

server.listen(port, () => console.log(`Listening on ${port}`));