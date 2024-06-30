import { Index2 } from "./index2";
import * as Blockly from 'blockly/core';

export class HalImport {
	static import() {
		try {
			let value = document.querySelector('textarea').value;
			let code = JSON.parse(value);
			console.log(code);
			Blockly.serialization.workspaces.load(code, Index2.workspace);
		}
		catch (e) {
			console.error(e);
		}
	}
}
