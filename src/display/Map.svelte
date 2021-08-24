<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Readable } from "svelte/store";
  import type { GameWorld } from "../global";
  import type StaticObject from "../model/StaticObject";

  let screen: HTMLCanvasElement;

  const world: Readable<GameWorld> = getContext("world");
  const zoom = 2;

  function onResize() {
    screen.width = screen.parentElement.clientWidth;
    screen.height = screen.parentElement.clientHeight;
    draw($world);
  }

  function draw(world) {
    const ctx = screen.getContext("2d");
    ctx.clearRect(0, 0, screen.width, screen.height);
    for (let [_, e] of world) {
      if (!("position" in e)) continue;
      if ("points" in e && e.points.length > 3) {
        const {
          points,
          position: [x, y],
        } = e;
        ctx.beginPath();
        ctx.moveTo(points[0][0] + x * zoom, points[0][1] + y * zoom);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0] + x * zoom, points[i][1] + y * zoom);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(e.position[0] * zoom, e.position[1] * zoom, 3 * zoom, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'cyan';
        ctx.fill();
      }
    }
  }

  onMount(() => {
    onResize();
    world.subscribe((world) => draw(world));
  });
</script>

<svelte:window on:resize={onResize} />

<div class="canvas-container">
  <canvas bind:this={screen} />
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
  }
</style>
