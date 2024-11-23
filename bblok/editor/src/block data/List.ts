import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class ListDef {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "List 2";
	readonly hidden = "false";
	readonly toolbox = true;	//tidak dimasukkan di custom toolbox

	constructor() {
		// ha.js.List.push
		this.list.push({
			type: "ha.js.List.push",
			perintah: "ha.js.List.push",
			message0: "List %1 push %2",
			args: {
				list: {},
				value: {},
			},
			inputsInline: true,

			tooltip: `
            Push value to the end of a list
        `,
		})

		// ha.js.List.pop;
		this.list.push({
			type: "ha.js.List.pop",
			perintah: "ha.js.List.pop",
			message0: "List %1 pop",
			args: {
				list: {},
			},
			output: EOutput.Any,
			inputsInline: true,

			tooltip: `
            Pop value from the end of a list and return the value
        `,
		})
	}

}

export const listDef = new ListDef();