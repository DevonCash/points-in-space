import type { Vec2 } from "../global";
import StaticObject from "./StaticObject";

export default abstract class DynamicObject extends StaticObject {

  velocity: Vec2 = [0, 0]

  constructor(data: Partial<DynamicObject>) {
    super(data);
  }

  step(dt): boolean {

    if (this.velocity[0] === 0 && this.velocity[1] === 0) return false;

    this.position[0] += this.velocity[0] * dt / 100;
    this.position[1] += this.velocity[1] * dt / 100;
    return true;

  }

  abstract onInput(event: InputEvent | KeyboardEvent)


}