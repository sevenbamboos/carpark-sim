'use strict';
const { parseFacing2Str, turnLeft, turnRight, moveForward, } = require('./common.js');

class Bus {
  constructor(id) {
    this.id = id;
    this.position = null;
    this.facing = null;
  }

  turnLeft() {
    if (!this.facing) throw 'facing is not set';
    this.facing = turnLeft(this.facing)
  }

  turnRight() {
    if (!this.facing) throw 'facing is not set';
    this.facing = turnRight(this.facing)
  }

  moveForward() {
    this.position = this.nextPosition();
  }

  place(position, facing) {
    this.position = position;
    this.facing = facing;
  }

  report() {
    if (!this.position || !this.facing) return 'facing or position is not set';
    return `${this.position.x}, ${this.position.y}, ${parseFacing2Str(this.facing)}`;
  }

  nextPosition() {
    if (!this.position || !this.facing) throw 'facing or position is not set';
    return moveForward(this.facing, this.position);
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
    return this.existingBuses.find(element => element.position !== null && element.position.isSame(position)) === undefined;
  }

  isInRange(position) {
    return position !== null 
        && position.x >= 0 
        && position.x < this.w 
        && position.y >= 0 
        && position.y < this.h;
  }
}

module.exports = {
  Bus, CarPark,
};