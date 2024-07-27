export class Export {
	static readonly beUrl = `./js/be.js`;
	static readonly dataTemplate = `

	window.onload = () => {
		console.log('start');
		/** script here **/
		let __update; // = update || Update || UPDATE as any;
		if (typeof _update === "function")
			__update = _update;
		console.log(__update);
		let __updater = () => {
			if (__update) {
				__update();
			}
			requestAnimationFrame(__updater);
		};
		requestAnimationFrame(__updater);
	};
	
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

	static export(code: string): string {
		console.group("export:");
		console.log(code);
		console.groupEnd();

		let dataHtml = this.dataHtml;
		dataHtml = dataHtml.replace('/** template **/', this.dataTemplate);
		dataHtml = dataHtml.replace('/** script here **/', code);

		return dataHtml;
	}
}
