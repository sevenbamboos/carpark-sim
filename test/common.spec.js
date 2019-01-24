'use strict'

const assert = require('assert');
const { Tuple2, Facing, parseFacing2Str, parseStr2Facing, turnLeft, turnRight, moveForward }  = require('../lib/common');

describe('test Tuple2', () => {

  it('can add and compare', () => {
    const t1 = new Tuple2(1, 2);
    const t2 = new Tuple2(3, 4);
    assert(t1.add(t2).isSame(new Tuple2(4, 6)));
    assert(!t1.add(t2).isSame(new Tuple2(6, 4)));
  });

  it('can output', () => {
    const t1 = new Tuple2(3, 4);
    assert.equal('(3, 4)', t1.toStr());
  });
  
});

describe('test Facing', () => {

  it('can parse from Tuple2', () => {
    const t1 = new Tuple2(1, 0);
    assert.equal('EAST', parseFacing2Str(t1));
  });

  it('can parse from String', () => {
    assert(Facing.NORTH.isSame(parseStr2Facing('north')));
    assert(Facing.NORTH.isSame(parseStr2Facing('NORTH')));
    assert(!Facing.NORTH.isSame(parseStr2Facing('EAST')))

    assert.throws(
      () => parseStr2Facing('not-a-facing')
    );
  });

  it('can turn around and move', () => {
    assert.equal(Facing.WEST, turnLeft(Facing.NORTH));
    assert.equal(Facing.SOUTH, turnLeft(Facing.WEST));
    assert.equal(Facing.EAST, turnLeft(Facing.SOUTH));
    assert.equal(Facing.NORTH, turnLeft(Facing.EAST));

    assert.equal(Facing.EAST, turnRight(Facing.NORTH));
    assert.equal(Facing.SOUTH, turnRight(Facing.EAST));
    assert.equal(Facing.WEST, turnRight(Facing.SOUTH));
    assert.equal(Facing.NORTH, turnRight(Facing.WEST));

    assert(new Tuple2(3, 2).isSame(moveForward(Facing.EAST, new Tuple2(2, 2))));
    assert(new Tuple2(2, 1).isSame(moveForward(Facing.SOUTH, new Tuple2(2, 2))));
    assert(new Tuple2(1, 2).isSame(moveForward(Facing.WEST, new Tuple2(2, 2))));
    assert(new Tuple2(2, 3).isSame(moveForward(Facing.NORTH, new Tuple2(2, 2))));
  });
  
});
