class Tuple2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(that) {
    return new Tuple2(this.x+that.x, this.y+that.y);
  }

  isSame(that) {
    return this.x === that.x && this.y === that.y;
  }

  toStr() {
    return `(${this.x}, ${this.y})`;
  }
}

const Facing = {
  EAST:   new Tuple2(1, 0),
  SOUTH:  new Tuple2(0, -1),
  WEST:   new Tuple2(-1, 0),
  NORTH:  new Tuple2(0, 1),
};

const ALL_FACINGS = [Facing.EAST, Facing.SOUTH, Facing.WEST, Facing.NORTH];

const parseFacing2Str = tuple2 => {
  for (let key of Object.keys(Facing)) {
    if (Facing[key].isSame(tuple2)) return key;
  }
  throw 'Invalid Facing:' + tuple2; 
}

const parseStr2Facing = str => {
  for (let key of Object.keys(Facing)) {
    if (key == str.toUpperCase()) return Facing[key];
  }
  throw 'Invalid Facing:' + str; 
}

const moveForward = (facing, position) => position.add(facing);

const turnLeft = facing => {
    let index = ALL_FACINGS.indexOf(facing);
    if (index == -1) throw 'Invalid Facing:' + facing;
    index--;
    index = index < 0 ? index + 4 : index;
    return ALL_FACINGS[index];
};

const turnRight = facing => {
    const index = ALL_FACINGS.indexOf(facing);
    if (index == -1) throw 'Invalid Facing:' + facing;
    return ALL_FACINGS[(index+1)%4];
};

module.exports = {
  Tuple2, Facing, moveForward, turnLeft, turnRight, parseFacing2Str, parseStr2Facing,
};