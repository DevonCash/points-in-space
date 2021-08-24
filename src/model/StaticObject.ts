import { v4 as uuid } from 'uuid';
import type { Vec2 } from '../global';


/* SHAPES:

  Circle
  Polygon

*/
export default abstract class StaticObject {

  id: string;

  position?: Vec2;
  points?: Vec2[];

  constructor(data?: Partial<StaticObject>) {
    this.id = data.id ?? this.constructor.name + ':' + uuid();
    this.position = data.position ?? [0, 0];
    this.points = data.points ?? [];
  }

  drawable() {
    return this.position.length === 2 && this.points.length > 2;
  }

}