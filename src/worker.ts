import { v4 as uuid } from 'uuid';
import Avatar from './model/Avatar';
import Room from './model/Room';
import SetPiece from './model/SetPiece';
import type StaticObject from './model/StaticObject';

const ctx: Worker = self as any;

const entities = new Map<string, StaticObject>();

function addEntity(entity) {
  entities.set(entity?.id ?? uuid(), entity)
}

addEntity(Room.Rect(0, 0, 210, 132))

//M12 11.5H11.5V12V52.5H0.5V0.5H22H52.5V11.5H12Z
addEntity(new SetPiece({
  position: [7, 7],
  points: [[0, 0], [53, 0], [53, 12], [12, 12], [12, 53], [0, 53]]
}))

addEntity(new Avatar({
  position: [60, 60]
}))

ctx.onmessage = (msg) => {
  if (msg.data.type === 'input') {
    entities.forEach(e => {
      if ('onInput' in e) (e as any).onInput(msg.data.event);
    })
  } else {
    console.log(msg);

  }
}

ctx.postMessage({ type: 'fullsync', entities });
ctx.postMessage({ type: 'debug', message: 'Worker Loaded' });

let t = performance.now()
let lastFullSync = t;
function update() {
  const dt = performance.now() - t;
  t = performance.now();

  const updated = new Map();
  for (let [id, e] of entities) {
    if ('step' in e) {
      const u = (e as any).step(dt);
      if (u) updated.set(id, e);
    }
  }
  if (t - lastFullSync > 500) {
    ctx.postMessage({ type: 'fullsync', entities })
    lastFullSync = t;
  } else if (updated.size > 0) {
    ctx.postMessage({ type: 'partialsync', updated, delta: dt, time: t });
  }
  // ctx.postMessage({ type: 'fullsync', entities });
}

setInterval(() => update(), 12);