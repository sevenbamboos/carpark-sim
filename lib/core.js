'use strict';
const { Tuple2, parseFacing2Str, turnLeft, turnRight, moveForward, } = require('./common.js');

class Bus {
  constructor(id) {
    this.id = id;
    this.position = null;
    this.facing = null;
  }

  turnLeft() {
    if (!this.facing) throw 'facing is not set';
    this.facing = turnLeft(this.facing)
    return new Tuple2(this.position, this.facing);
  }

  turnRight() {
    if (!this.facing) throw 'facing is not set';
    this.facing = turnRight(this.facing)
    return new Tuple2(this.position, this.facing);
  }

  moveForward() {
    this.position = this.nextPosition();
    return new Tuple2(this.position, this.facing);
  }

  place(position, facing) {
    this.position = position;
    this.facing = facing;
    return new Tuple2(this.position, this.facing);
  }

  report() {
    if (!this.position || !this.facing) return 'facing or position is not set';
    return `${this.position.x}, ${this.position.y}, ${parseFacing2Str(this.facing)}`;
  }

  nextPosition() {
    if (!this.position || !this.facing) throw 'facing or position is not set';
    return moveForward(this.facing, this.position);
  }

  toStr() {
    return `BUS ${this.id} ${this.position.toStr()} ${parseFacing2Str(this.facing)}`
  }
}

class CarPark {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.existingBuses = []
  }

  addBus(bus) {
    if (!bus) throw 'can not add an empty bus.';
    if (!this.existingBuses.find(element => element.id === bus.id)) {
      this.existingBuses.push(bus);
    }
  }

  reset() { this.existingBuses = []; }

  isFree(position) {
    if (position == null) throw 'Invalid position: empty.';
    return this.findBus(position) === undefined;
  }

  findBus(position) {
    return this.existingBuses.find(element => 
      element.position !== null 
      && element.position.isSame(position)
    );
  }

  isInRange(position) {
    return position !== null 
        && position.x >= 0 
        && position.x < this.w 
        && position.y >= 0 
        && position.y < this.h;
  }

  // accumulator is (data, x, y): data
  reduce(accumulator, initData) {
    let data = initData;
    for (let i = this.h-1; i >= 0; i--) {
      for (let j = 0; j < this.w; j++) {
        data = accumulator(data, j, i);
      }
    }
    return data;
  }

  toStr() {
    const drawCarParkLayout = (data, x, y) => {
      const bus = this.findBus(new Tuple2(x, y));
      data += bus === undefined ? '|_' : `|${parseFacing2Str(bus.facing).charAt(0)}`;
      if (x === this.w-1) data += '|\n';
      return data;
    };

    return this.reduce(drawCarParkLayout, '');
  }

  toTrace(positions, facing) {
    const accumulator = (data, x, y) => {
      const isPosition = positions.find(position => position.isSame(new Tuple2(x, y)));
      data += isPosition ? '|*' : '|_';
      if (x === this.w-1) data += '|\n';
      return data;
    };

    return this.reduce(accumulator, '');
  }
}

module.exports = {
  Bus, CarPark,
};