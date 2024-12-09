import { javascriptGenerator } from "blockly/javascript";
import { Index2 } from "./index2";

export class Export {
	static readonly dataTemplate = `

let bbId = "";
let errorPopup = true;
/** override errorPopup **/

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
	console.error(e);
    console.log(window.parent.opener.api);
    if (!errorPopup)
        return;
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
	
		<script src="./js/basik.js" defer></script>
	
		<!-- main  -->
		<script defer>
			/** template **/
		</script>
	</body>
	
	</html>
		        `;

	//TODO: move to index2.js 
	static exportJs(debug: boolean): string {
		console.log("export js:", debug);
		javascriptGenerator.addReservedWords('__update');
		javascriptGenerator.addReservedWords('__updater');
		javascriptGenerator.addReservedWords('_update');
		javascriptGenerator.addReservedWords('error');
		javascriptGenerator.addReservedWords('bbId');
		javascriptGenerator.addReservedWords('errorPopup');

		// if (Index2.checkBacktick()) debug = false;

		if (debug) {
			javascriptGenerator.STATEMENT_PREFIX = "setId(%1);\n";
		}
		else {
			javascriptGenerator.STATEMENT_PREFIX = "";
		}

		let codeJs = javascriptGenerator.workspaceToCode(Index2.workspace);
		if (!debug) {
			codeJs = codeJs.replace("/** override errorPopup **/", "errorPopup = false;");
		}
		return codeJs;
	}

	static exportHtml(code: string): string {
		console.groupCollapsed("export:");

		code = "\n/** code start **/ \n" + code + "\n/** code end **/\n";

		console.groupCollapsed('code')
		console.log(code);
		console.groupEnd();

		let dataHtml = this.dataHtml;
		let dataTemplate = this.dataTemplate;

		console.groupCollapsed('data html');
		console.log(dataHtml);
		console.groupEnd();

		console.groupCollapsed('data template');
		console.log(dataTemplate);
		console.groupEnd();

		let dataTemplateAr = dataTemplate.split('/** script here **/');

		dataTemplate = dataTemplateAr[0] + code + dataTemplateAr[1];

		console.groupCollapsed('data template 2');
		console.log(dataTemplate);
		console.groupEnd();

		let dataHtml2 = dataHtml.split('/** template **/');
		// dataHtml = dataHtml.replace('/** template **/', dataTemplate);
		dataHtml = dataHtml2[0] + dataTemplate + dataHtml2[1];
		console.groupCollapsed('data html');
		console.log(dataHtml);
		console.groupEnd();

		// dataHtml = dataHtml.replace('/** script here **/', code);
		console.groupEnd();
		return dataHtml;
	}

}
