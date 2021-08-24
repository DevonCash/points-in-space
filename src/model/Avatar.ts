import DynamicObject from "./DynamicObject";

export default class Avatar extends DynamicObject {

  constructor(data: Partial<Avatar>) {
    super(data);
  }

  onInput(input: InputEvent | KeyboardEvent) {
    if (input.type === 'keydown') {
      const { key } = input as KeyboardEvent;
      switch (key) {
        case 'w':
          return this.velocity[1] = -10
        case 's':
          return this.velocity[1] = 10
        case 'a':
          return this.velocity[0] = -10
        case 'd':
          return this.velocity[0] = 10
      }
    } else if (input.type === 'keyup') {
      const { key } = input as KeyboardEvent;
      switch (key) {
        case 'w':
        case 's':
          return this.velocity[1] = 0;

        case 'a':
        case 'd':
          return this.velocity[0] = 0;
      }
    }
  }
}
