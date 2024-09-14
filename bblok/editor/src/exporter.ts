import { javascriptGenerator } from "blockly/javascript";
import { Index2 } from "./index2";

export class Export {
	static readonly dataTemplate = `

	let bbId = "";
	window.onload = () => {
		console.log('start');
		let error = false;
		/** script here **/
		if (error)
			return;
		let __update; // = update || Update || UPDATE as any;
		if (typeof _update === "function")
			__update = _update;
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
		};
		requestAnimationFrame(__updater);
	};
	/* fungsi tambhan */
	function setId(n) {
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
		if (!window.parent.parent) {
			console.log("parent-parent tidak ada");
			return;
		}
		if (window.parent.opener.api == null) {
			console.log("api tidak ada");
			return;
		}
		window.parent.opener.api.highlight(bbId);
	}
	function handleError(e) {
		console.log(e.message);
		console.log(window.parent.opener.api);
		alert(e.message);
		highlight();
	}
					
`;

	static readonly dataHtml = `
	<!DOCTYPE html>
	<html>
	
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
			target-densityDpi=device-dpi">
		<title>Basik Blok</title>
		<style>
			canvas {
				image-rendering: pixelated;
				background-color: black;
			}
		</style>
	</head>
	
	<body>
		<canvas></canvas>
	
		<script src="./js/blitz.js" defer></script>
		<script src="./js/bblok.js" defer></script>
		<script src="./js/js.js" defer></script>
	
		<!-- main  -->
		<script defer>
			/** template **/
		</script>
	</body>
	
	</html>
		        `;

	static exportJs(debug: boolean): string {
		javascriptGenerator.addReservedWords('__update');
		javascriptGenerator.addReservedWords('__updater');
		javascriptGenerator.addReservedWords('_update');
		javascriptGenerator.addReservedWords('error');
		javascriptGenerator.addReservedWords('bbId');

		if (debug) {
			javascriptGenerator.STATEMENT_PREFIX = "setId(%1);\n";
		}

		let codeHtml = javascriptGenerator.workspaceToCode(Index2.workspace);
		return codeHtml;
	}

	static exportHtml(code: string): string {
		console.groupCollapsed("export:");
		console.log(code);
		console.groupEnd();

		let dataHtml = this.dataHtml;
		dataHtml = dataHtml.replace('/** template **/', this.dataTemplate);
		dataHtml = dataHtml.replace('/** script here **/', code);

		return dataHtml;
	}

}
