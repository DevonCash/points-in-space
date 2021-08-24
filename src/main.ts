import { writable } from 'svelte/store';
import App from './display/App.svelte';
import type { GameWorld } from './global';
import type StaticObject from './model/StaticObject';




const worker = new Worker('/build/worker.js');

const data: GameWorld = new Map<string, StaticObject>()

const { set, update, subscribe } = writable(data, () => { })

worker.onmessage = ({ data }) => {
	// console.log(data);
	switch (data.type) {
		case 'debug': return console.log(data);
		case 'fullsync': return set(data.entities);
		case 'partialsync': return update(w => {
			for (let [id, e] of data.updated) {
				w.set(id, e);
			}
			return w;
		})
	}
}

const app = new App({
	target: document.body,
	props: {
		worker,
		world: { subscribe }
	}
});

export default app;