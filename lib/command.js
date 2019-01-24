const {Tuple2, parseStr2Facing} = require('./common.js');

const place = (carPark, bus) => {
  return payload => {
    const position = new Tuple2(payload.x, payload.y);
    if (!carPark.isInRange(position) || !carPark.isFree(position)) throw `Invalid place: ${position.toStr()}`;
    bus.place(position, payload.f);
  };
};

const move = (carPark, bus) => {
  return () => {
    const position = bus.nextPosition();
    if (!carPark.isInRange(position) || !carPark.isFree(position)) throw `Invalid move: ${position.toStr()}`;
    bus.moveForward();
  };
};

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

  static applyCommand(carPark, bus, cmdStr) {
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
  }
}

module.exports = {
  Command,
};