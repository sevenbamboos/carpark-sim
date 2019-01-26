'use strict'

const assert = require('assert');
const { Tuple2, Facing, parseFacing2Str, parseStr2Facing, turnLeft, turnRight, moveForward }  = require('../lib/common');
const { Bus, CarPark } = require('../lib/core');

describe('test Bus', () => {

  it('can output', () => {
    const b1 = new Bus(1);
    b1.place(new Tuple2(2, 2), Facing.EAST);
    assert.equal('2, 2, EAST', b1.report());
    assert.equal('BUS 1 (2, 2) EAST', b1.toStr());
  });

  it('can give the next position', () => {
    const b1 = new Bus(1);
    b1.place(new Tuple2(2, 2), Facing.EAST);
    assert(new Tuple2(3, 2).isSame(b1.nextPosition()));
    // the bus remains the same place after call nextPosition
    assert.equal('2, 2, EAST', b1.report());
  });

  it('can turn around and move forward', () => {
    const b1 = new Bus(1);

    assert.throws(
      () => b1.turnLeft()
    );

    assert.throws(
      () => b1.turnRight()
    );

    assert.throws(
      () => b1.moveForward()
    );

    b1.place(new Tuple2(2, 2), Facing.EAST);
    b1.turnLeft();
    assert.equal('2, 2, NORTH', b1.report());

    b1.turnRight();
    assert.equal('2, 2, EAST', b1.report());

    b1.moveForward();
    assert.equal('3, 2, EAST', b1.report());

  });
  
});

describe('test CarPark', () => {

  it('can check valid position', () => {
    const b1 = new Bus(1);
    b1.place(new Tuple2(2, 2), Facing.EAST);
    const carPark = new CarPark(5, 5);
    assert(carPark.isFree(2, 2));

    carPark.addBus(b1);
    assert(!carPark.isFree(new Tuple2(2, 2)));
    
    assert(carPark.isInRange(new Tuple2(2, 2)));
    assert(carPark.isInRange(new Tuple2(0, 0)));
    assert(carPark.isInRange(new Tuple2(4, 4)));

    assert(!carPark.isInRange(new Tuple2(4, 5)));
    assert(!carPark.isInRange(new Tuple2(5, 4)));
    assert(!carPark.isInRange(new Tuple2(5, 5)));
    assert(!carPark.isInRange(new Tuple2(0, -1)));
    assert(!carPark.isInRange(new Tuple2(-1, 0)));
    assert(!carPark.isInRange(new Tuple2(-1, -1)));
  });

  it('can output', () => {

    const carPark = new CarPark(5, 5);

    const b1 = new Bus(1);
    b1.place(new Tuple2(2, 2), Facing.EAST);
    carPark.addBus(b1);

    const b2 = new Bus(2);
    b2.place(new Tuple2(4, 3), Facing.NORTH);
    carPark.addBus(b2);

    console.log(carPark.toStr());

    carPark.reset();
    carPark.addBus(b1);

    const traces = [];
    traces.push(b1.moveForward());
    traces.push(b1.moveForward());
    traces.push(b1.turnLeft());
    traces.push(b1.moveForward());
    traces.push(b1.moveForward());
    traces.push(b1.turnLeft());
    traces.push(b1.moveForward());
    traces.push(b1.moveForward());
    traces.push(b1.moveForward());
    traces.push(b1.moveForward());

    console.log(carPark.toStr());
    console.log(carPark.toTrace(traces.map(t => t.x)));
     
  });
  
});