import { javascriptGenerator } from "blockly/javascript";
import { Index2 } from "./index2";

export class Export {
	static readonly dataTemplate = `

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
	function handleError(e) {
		console.log(e.message);
		alert(e.message);
		//dialog
		//pesan
		//highlight
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
			}
		</style>
	</head>
	
	<body>
		<canvas></canvas>
	
		<!-- copy be.js script to your local to help save bandwith, thanks -->
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

	static exportJs(): string {
		javascriptGenerator.addReservedWords('__update');
		javascriptGenerator.addReservedWords('__updater');
		javascriptGenerator.addReservedWords('_update');
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
