import StaticObject from './StaticObject';

export default class Room extends StaticObject {

  position: [number, number];
  points: [number, number][];

  constructor(data: Partial<Room>) {
    super(data)
    this.position = data.position ?? [0, 0];
    this.points = data.points ?? [];
  }

  static Rect(x, y, w, h) {
    return new Room({
      position: [x, y],
      points: [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h]
      ]
    })
  }
}