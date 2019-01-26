'use strict'

const assert = require('assert');
const { Bus, CarPark } = require('../lib/core');
const { parseAndExecute } = require('../lib/command');

describe('test Command', () => {

  let b1;
  let carPark;
  let cmd;

  beforeEach(() => {
    b1 = new Bus(1);
    carPark = new CarPark(5, 5);
    cmd = parseAndExecute(carPark, b1);
  });  

  it('can handle normal scenario', () => {
    cmd('PLACE, 2, 2, EAST');
    cmd('RIGHT')
    cmd('MOVE')
    cmd('MOVE')
    cmd('RIGHT')
    cmd('MOVE')
    cmd('MOVE')
    assert.equal('0, 0, WEST', cmd('REPORT'));
  });
  
  it('can handle valid/invalid place', () => {
    cmd('PLACE, 2, 2, EAST');
    assert.equal('2, 2, EAST', cmd('REPORT'));

    assert.throws(
      () => cmd('PLACE, 5, 5, WEST')
    );
    assert.equal('2, 2, EAST', cmd('REPORT'));

    cmd('PLACE, 3, 3, NORTH');
    assert.equal('3, 3, NORTH', cmd('REPORT'));
  });

  it('can handle invalid move', () => {
    cmd('PLACE, 2, 2, EAST');
    assert.equal('2, 2, EAST', cmd('REPORT'));

    cmd('MOVE');
    cmd('MOVE');

    assert.throws(
      () => cmd('MOVE')
    );
    assert.equal('4, 2, EAST', cmd('REPORT'));

    cmd('LEFT');
    cmd('MOVE');
    cmd('MOVE');

    assert.throws(
      () => cmd('MOVE')
    );
    assert.equal('4, 4, NORTH', cmd('REPORT'));
  });

  it('can handle a second round with reset', () => {
    cmd('PLACE, 2, 2, EAST');
    assert.equal('2, 2, EAST', cmd('REPORT'));

    carPark.reset();
    b1 = new Bus(1);
    cmd = parseAndExecute(carPark, b1);
    cmd('PLACE, 2, 2, EAST');
    assert.equal('2, 2, EAST', cmd('REPORT'));
  });
});
