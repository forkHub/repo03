export class Export {
	static readonly beUrl = `./js/be.js`;
	static readonly dataTemplate = `
"use strict";
window.onload = () => {
    console.log('start');
    /** script here **/

    let __update;
    if (typeof _update === "function")
        __update = _update;
	
    let __updater = () => {
		try {
			if (__update) {
				__update();
			}

			//todo: exit checking
			requestAnimationFrame(__updater);	
		}
		catch (e) {
			//todo: alert
			
			console.log(e);
		}
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

    <script src="./js/blitz.js"></script>
    <script src="./js/bblok.js"></script>
    <script src="./js/js.js"></script>

    <!-- main  -->
    <script>
        /** template **/
    </script>
</body>

</html>
        `;

	static export(code: string): string {
		console.group("export:");
		console.log(code);
		console.groupEnd();

		let data2 = this.dataHtml;
		data2 = data2.replace('/** template **/', this.dataTemplate);
		data2 = data2.replace('/** script here **/', code);
		// debugger;

		return data2;
	}
}
