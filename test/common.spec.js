'use strict'

const assert = require('assert');
const { Tuple2, Facing, parseFacing2Str, parseStr2Facing }  = require('../lib/common');

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
  
});
