'use strict';
const {Tuple2, parseStr2Facing} = require('./common.js');

const place = (carPark, bus) => {
  return payload => {
    const position = new Tuple2(payload.x, payload.y);
    _checkPosition(carPark, position);
    bus.place(position, payload.f);
  };
};

const move = (carPark, bus) => {
  return () => {
    _checkPosition(carPark, bus.nextPosition());
    bus.moveForward();
  };
};

const _checkPosition = (carPark, position) => {
  if (!carPark.isInRange(position)) throw `Out of scope: ${position.toStr()}`;
  if (!carPark.isFree(position)) throw `Occupied: ${position.toStr()}`;
}

const left = (_, bus) => {
  return () => {
    bus.turnLeft();
  };
};

const right = (_, bus) => {
  return () => {
    bus.turnRight();
  };
};

const report = (_, bus) => {
  return () => {
    return bus.report();
  };
};

class Command {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;

    if (type === 'PLACE') {
      this.executor = place;
    } else if (type === 'MOVE') {
      this.executor = move;
    } else if (type === 'LEFT') {
      this.executor = left;
    } else if (type === 'RIGHT') {
      this.executor = right;
    } else if (type === 'REPORT') {
      this.executor = report;
    } else {
      throw 'Unknown type:' + type;
    }
  }

  execute(carPark, bus) {
    carPark.addBus(bus);
    return this.executor(carPark, bus)(this.payload);
  }
}

const parseAndExecute = (carPark, bus) => {
  return cmdStr => {
    const params = cmdStr.split(',');
    
    if (params && params.length === 4 && params[0].toUpperCase() === 'PLACE') {
      const payload = {
        x: parseInt(params[1]), 
        y: parseInt(params[2]), 
        f: parseStr2Facing(params[3].trim())
      };
      return new Command('PLACE', payload).execute(carPark, bus);

    } else if (params.length === 1) {
      return new Command(params[0].toUpperCase()).execute(carPark, bus);

    } else {
      throw 'Unknown command:' + cmdStr;
    }
  };
};

module.exports = {
  Command, parseAndExecute: parseAndExecute,
};