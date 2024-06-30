import { TToolBoxBlockDef } from "../toolboxType";

class DebugData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Misc";
	readonly hidden = "false";

	constructor() {
		this.list.push({
			type: "console.log",
			perintah: "console.log",
			message0: "Log %1",
			args: {
				log: ""
			},
			tooltip: "console log",
		});

		this.list.push({
			type: "debugger",
			perintah: "debugger",
			message0: "Pause",
			tooltip: `
				Pause a program when developer tool is open.
				This is the alias for debugger
			`,
			kurung: false
		});

		this.list.push({
			type: "note",
			perintah: "//",
			kurung: false,
			message0: "📝 %1",
			args: {
				comment: ""
			},
			tooltip: "Add note. Will be converted into comment in the real code",
		});
	}
}

export const debugData = new DebugData();