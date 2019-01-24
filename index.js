const { Bus, CarPark } = require('./lib/core');
const { Command } = require('./lib/command');

const carPark = new CarPark(5, 5);
const aBus = new Bus(1);

const cmd = Command.applyCommand.bind(null, carPark, aBus);
cmd('PLACE, 1, 2, EAST');
cmd('MOVE');
cmd('MOVE');
cmd('MOVE');
console.log(cmd('REPORT'));
cmd('LEFT');
cmd('MOVE');
cmd('MOVE');
console.log(cmd('REPORT'));
