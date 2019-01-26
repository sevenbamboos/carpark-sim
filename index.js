const { Bus, CarPark } = require('./lib/core');
const { parseAndExecute } = require('./lib/command');

const carPark = new CarPark(5, 5);
const aBus = new Bus(1);

const cmd = parseAndExecute(carPark, aBus);
cmd('PLACE, 1, 2, EAST');
console.log(cmd('REPORT'));

carPark.reset();
cmd('PLACE, 1, 2, EAST');
console.log(cmd('REPORT'));

