<script lang="ts">
	import Map from "./Map.svelte";
	import { setContext } from "svelte";
	export let world;
	export let worker: Worker;

	setContext("world", world);

	function sendInput(event) {
		if (event.type === "keydown" || event.type === "keyup") {
			event = {
				type: event.type,
				key: event.key,
				code: event.code,
				shiftKey: event.shiftKey,
				ctrlKey: event.ctrlKey,
			};
		}
		worker.postMessage({ type: "input", event });
	}

</script>

<svelte:window on:keydown={sendInput} on:keyup={sendInput} />

<main>
	<Map />
</main>

<style>
	:global(html, body) {
		padding: 0;
		border: 0;
		margin: 0;
		height: 100vh;
		width: 100vw;
		position: absolute;
		overflow: hidden;
		background: black;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}
</style>
