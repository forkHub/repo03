import { Val } from "../Validasi";
import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class ListDef {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "List 2";
	readonly hidden = "false";
	readonly toolbox = false;	//tidak dimasukkan di custom toolbox

	constructor() {
		// ha.js.List.push
		this.list.push({
			type: "ha.js.List.push",
			// perintah: "ha.js.List.push",
			message0: "List %1 push %2",
			args: {
				list: {},
				value: {},
			},
			inputsInline: true,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".push(" + arg[1] + ")";
				return res;
			},

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
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				let res = arg[0] + ".pop()";
				return res;
			},

			tooltip: `
            Pop value from the end of a list and return the value
        `,
		})

		//List getter
		this.list.push({
			type: "List_getter",
			message0: "List %1 # %2",
			args: {
				list: {},
				idx: 0
			},
			output: EOutput.Any,
			tooltip: 'Mengambil nilai pada idx # dari list',
			f: (arg: string[]): string => {
				console.log("generate js for list getter:", arg);
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + "[" + arg[1] + " - 1]";
				return res;
			}
		});

		//List setter
		this.list.push({
			type: "List_setter",
			message0: "List %1 # %2 = %3",
			args: {
				list: {},
				idx: 0,
				value: {},
			},
			tooltip: 'Mengeset nilai pada idx # dari list',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + "[" + ((arg[1] as unknown as number) - 1) + "] = " + arg[2];
				return res;
			}
		})

	}

}

export const listDef = new ListDef();