declare var _update: any;
let bbId: string = "";

window.onload = () => {
	console.log('start');
	let error = false;

	/** script here **/

	if (error) return;

	let __update: () => void; // = update || Update || UPDATE as any;
	if (typeof _update === "function") __update = _update;

	console.log(__update);

	let __updater = () => {
		try {
			if (__update) {
				//TODO: pre update
				__update();
				//TODO: post update
			}
			requestAnimationFrame(__updater);
		}
		catch (e) {
			e.message = 'Ada kesalahan di grup update: ' + e.message;
			handleError(e);
		}
	}

	requestAnimationFrame(__updater);
}

/* fungsi tambhan */

function setId(n: string): void {
	bbId = n;
}

function highlight() {
	if (bbId == "") {
		console.log("bbid null");
		return;
	}

	if (!window.parent) {
		console.log("parent tidak ada");
		return;
	}
	if ((window.parent as any).api == null) {
		console.log("api tidak ada");
		return;
	}

	(window.parent as any).api.highlight(bbId);
}

function handleError(e: Error) {
	console.log(e.message);
	alert(e.message);
	highlight();
}
